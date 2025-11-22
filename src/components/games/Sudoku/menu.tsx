

export default function Menu({ emptyGrid, onNewGame, onSolve }: { 
    emptyGrid: () => void, 
    onNewGame: () => void, 
    onSolve: () => void
})
 {
    return <div className='sudoku-menu'>

            <button> Coup précédent (pas fait)</button>
            <button onClick={emptyGrid}>Vider la grille</button>
            <button onClick={onNewGame}>Créer une nouvelle grille</button>
            <button onClick={onSolve}>Résoudre la grille</button>


            <button>Charger une grille (pas fait)</button>
            <button >Sauvegarder la grille (pas fait)</button>
            <button>Charger une grille depuis <br /> une photo<br />(pas fait et comment faire ?)</button>

    </div>
}

