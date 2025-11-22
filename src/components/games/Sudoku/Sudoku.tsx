import { useRef, useState,useEffect, forwardRef, useCallback } from 'react'
import './Sudoku.css'
import Menu from './menu.tsx'
import BacktrackingNoOpti from './backtracking.ts'
import type { CellValue }  from '../../../types/sudoku_types.ts'

function Cell({value, isFocused, onMouseDown}: {value: CellValue, isFocused: boolean, onMouseDown: () => void}) {
    return (
        <button  
      onMouseDown={onMouseDown}
      className={`${isFocused ? 'focused' : ''} square`}
    >
      {value}
    </button>
  );
}

function Board({squares, onCellChange}: {squares: CellValue[][], onCellChange: (i: number, j: number, value: CellValue) => void}) {
    const [focusedCell, setFocusedCell] = useState<{i: number, j: number}>({i: 0, j: 0});
    const cellRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    useEffect(() => {
        if (focusedCell) {
            const key = `${focusedCell.i}-${focusedCell.j}`;
            cellRefs.current[key]?.focus();
        }
    }, [focusedCell]);

    const handlePlus = (i: number, j: number) => {
        const currentValue = squares[i][j];
        const newValue = currentValue === null ? 1 : (currentValue === 9 ? null : currentValue + 1);
        onCellChange(i, j, newValue);
    };

    const handleMinus = (i: number, j: number) => {
        const currentValue = squares[i][j];
        const newValue = currentValue === null ? 9 : (currentValue === 1 ? null : currentValue - 1);
        onCellChange(i, j, newValue);
    };
    const handleClick = (i: number, j: number) => {
        console.log('Past focused:', focusedCell, 'New focus:', i, j);
        setFocusedCell({i, j});
        handlePlus(i, j);
    };
    

  
    return (
        <div>
            {squares.map((row, i) => (
                <div key={i} className="board-row">
                    {row.map((value, j) => (
                        <Cell 
                        key={j}
                        value={value}
                        isFocused={focusedCell?.i === i && focusedCell?.j === j}
                        onMouseDown={() => handleClick(i, j)}
/>
                    ))}
                </div>
            ))}
        </div>
    );
}


export default function Sudoku() {
    const [squares, setSquares] = useState<CellValue[][]>(Array(9).fill(null).map(() => Array(9).fill(null)));

    const handleSolve = (squares: CellValue[][]) => { 
        const newSquares = squares.map(row => [...row]);
        BacktrackingNoOpti(newSquares);
        setSquares(newSquares);
    };

    const handleNewGame = () => {
        const emptyGrid = Array(9).fill(null).map(() => Array(9).fill(null));
        handleSolve(emptyGrid);
    };

    const handleCellChange = (i: number, j: number, value: CellValue) => {
        setSquares(prevSquares => {
            const newSquares = prevSquares.map(row => [...row]);
            newSquares[i][j] = value;
            return newSquares;
        });
    };

    return <div className='sudoku-wrapper'>
        <h1 className="title">Sudoku</h1>
        <div className="sudoku-game">
            <div className="sudoku-game-board">
                <Board 
                    squares={squares}
                    onCellChange={handleCellChange}
                />
            </div>
            <Menu 
            emptyGrid={() => {setSquares(Array(9).fill(null).map(() => Array(9).fill(null)));}} 
            onNewGame={handleNewGame}
            onSolve={() => handleSolve(squares)}
        />
    </div>
</div>;
}
