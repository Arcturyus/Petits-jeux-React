import { useState } from 'react'
import './Sudoku.css'
import Menu from './menu.tsx'
import BacktrackingNoOpti from './backtracking.ts'
import type { CellValue } from '../../../types/sudoku_types.ts'

type Snapshot = { squares: CellValue[][], fixedCells: boolean[][] }

function Cell({
    value, isFocused, isFixed, onMouseDown, onWheel, row, col
}: {
    value: CellValue,
    isFocused: boolean,
    isFixed: boolean,
    onMouseDown: () => void,
    onWheel: (e: React.WheelEvent) => void,
    row: number,
    col: number
}) {
    const classes = [
        'square',
        isFocused ? 'focused' : '',
        isFixed ? 'fixed' : '',
        col % 3 === 2 && col !== 8 ? 'block-sep-right' : '',
        row % 3 === 2 && row !== 8 ? 'block-sep-bottom' : '',
        (Math.floor(row / 3) + Math.floor(col / 3)) % 2 === 1 ? 'block-alt' : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            onMouseDown={onMouseDown}
            onWheel={onWheel}
            className={classes}
        >
            {value}
        </button>
    );
}

function Board({
    squares, fixedCells, onCellChange
}: {
    squares: CellValue[][],
    fixedCells: boolean[][],
    onCellChange: (i: number, j: number, value: CellValue) => void
}) {
    const [focusedCell, setFocusedCell] = useState<{ i: number, j: number }>({ i: 0, j: 0 });

    const changeValue = (i: number, j: number, delta: 1 | -1) => {
        if (fixedCells[i][j]) return;
        const current = squares[i][j];
        const next: CellValue = delta === 1
            ? (current === null ? 1 : current === 9 ? null : current + 1)
            : (current === null ? 9 : current === 1 ? null : current - 1);
        onCellChange(i, j, next);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const { i, j } = focusedCell;
        if (e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            if (!fixedCells[i][j]) onCellChange(i, j, parseInt(e.key));
        } else if (e.key === '0' || e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            if (!fixedCells[i][j]) onCellChange(i, j, null);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedCell({ i: Math.max(0, i - 1), j });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedCell({ i: Math.min(8, i + 1), j });
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setFocusedCell({ i, j: Math.max(0, j - 1) });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setFocusedCell({ i, j: Math.min(8, j + 1) });
        }
    };

    return (
        <div
            className="board"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {squares.map((row, i) => (
                <div key={i} className="board-row">
                    {row.map((value, j) => (
                        <Cell
                            key={j}
                            value={value}
                            isFocused={focusedCell.i === i && focusedCell.j === j}
                            isFixed={fixedCells[i][j]}
                            onMouseDown={() => setFocusedCell({ i, j })}
                            onWheel={(e) => {
                                e.preventDefault();
                                setFocusedCell({ i, j });
                                changeValue(i, j, e.deltaY < 0 ? 1 : -1);
                            }}
                            row={i}
                            col={j}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

const makeEmptyGrid = (): CellValue[][] => Array(9).fill(null).map(() => Array(9).fill(null));
const makeEmptyFixed = (): boolean[][] => Array(9).fill(null).map(() => Array(9).fill(false));

const initialSnapshot: Snapshot = { squares: makeEmptyGrid(), fixedCells: makeEmptyFixed() };

export default function Sudoku() {
    const [history, setHistory] = useState<Snapshot[]>([initialSnapshot]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const { squares, fixedCells } = history[historyIndex];

    const pushSnapshot = (snapshot: Snapshot) => {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), snapshot]);
        setHistoryIndex(i => i + 1);
    };

    const handleUndo = () => {
        if (historyIndex > 0) setHistoryIndex(i => i - 1);
    };

    const handleNewGame = () => {
        const full = makeEmptyGrid();
        BacktrackingNoOpti(full);

        const indices = Array.from({ length: 81 }, (_, k) => k);
        for (let k = indices.length - 1; k > 0; k--) {
            const r = Math.floor(Math.random() * (k + 1));
            [indices[k], indices[r]] = [indices[r], indices[k]];
        }
        const toHide = new Set(indices.slice(0, 45));

        const newFixed = makeEmptyFixed();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (toHide.has(i * 9 + j)) {
                    full[i][j] = null;
                } else {
                    newFixed[i][j] = true;
                }
            }
        }

        pushSnapshot({ squares: full, fixedCells: newFixed });
    };

    const handleSolve = () => {
        const newSquares = squares.map(row => [...row]);
        BacktrackingNoOpti(newSquares);
        pushSnapshot({ squares: newSquares, fixedCells });
    };

    const handleCellChange = (i: number, j: number, value: CellValue) => {
        if (fixedCells[i][j]) return;
        const newSquares = squares.map(row => [...row]);
        newSquares[i][j] = value;
        pushSnapshot({ squares: newSquares, fixedCells });
    };

    const handleEmptyGrid = () => {
        pushSnapshot({ squares: makeEmptyGrid(), fixedCells: makeEmptyFixed() });
    };

    const handleSave = () => {
        const data = JSON.stringify({ squares, fixedCells });
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sudoku.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoad = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target?.result as string) as Snapshot;
                pushSnapshot({ squares: parsed.squares, fixedCells: parsed.fixedCells });
            } catch {
                alert('Fichier invalide');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className='sudoku-wrapper'>
            <h1 className="title">Sudoku</h1>
            <div className="sudoku-game">
                <div className="sudoku-game-board">
                    <Board
                        squares={squares}
                        fixedCells={fixedCells}
                        onCellChange={handleCellChange}
                    />
                </div>
                <Menu
                    emptyGrid={handleEmptyGrid}
                    onNewGame={handleNewGame}
                    onSolve={handleSolve}
                    onUndo={handleUndo}
                    canUndo={historyIndex > 0}
                    onSave={handleSave}
                    onLoad={handleLoad}
                />
            </div>
        </div>
    );
}
