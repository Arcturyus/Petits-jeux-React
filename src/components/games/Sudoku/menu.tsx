import { useRef } from 'react'

export default function Menu({ emptyGrid, onNewGame, onSolve, onUndo, canUndo, onSave, onLoad }: {
    emptyGrid: () => void,
    onNewGame: () => void,
    onSolve: () => void,
    onUndo: () => void,
    canUndo: boolean,
    onSave: () => void,
    onLoad: (file: File) => void,
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className='sudoku-menu'>
            <button onClick={onUndo} disabled={!canUndo}>Coup précédent</button>
            <button onClick={emptyGrid}>Vider la grille</button>
            <button onClick={onNewGame}>Créer une nouvelle grille</button>
            <button onClick={onSolve}>Résoudre la grille</button>
            <button onClick={onSave}>Sauvegarder la grille</button>
            <button onClick={() => fileInputRef.current?.click()}>Charger une grille</button>
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        onLoad(file);
                        e.target.value = '';
                    }
                }}
            />
        </div>
    );
}
