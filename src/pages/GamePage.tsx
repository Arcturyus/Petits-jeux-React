// src/pages/GamePage.tsx
import type { Game } from '../types/Game'
import Morpion from '../components/games/Morpion/Morpion' 
import Sudoku from '../components/games/Sudoku/Sudoku'

interface GamePageProps {
  game: Game
  onBack: () => void
}

function GamePage({ game, onBack }: GamePageProps) {
  
  const renderGame = () => {
    switch (game.id) {
      case 'morpion':
        return (
            <Morpion />
        )
      case 'sudoku':
        return (
            <Sudoku />
        )
      default:
        return (
          <div className="text-center p-8">
            <div className="text-4xl mb-4">🚧</div>
            <p className="text-gray-600">Ce jeu n'est pas encore implémenté</p>
          </div>
        )
    }
  }

  return (
    <div>
  
      <div>
          <button className="back_to_game_button"
          onClick={onBack}
          >
          ← Retour aux jeux
          </button>
      </div>

      <div>
        {renderGame()}
      </div>

    </div>
  )
}

export default GamePage