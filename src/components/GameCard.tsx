import type { Game } from '../types/Game'
import './GameCard.css'

interface GameCardProps {
  game: Game
  onSelect: (gameId: string) => void
}

export default function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <button onClick={() => onSelect(game.id)} className="game-card">
      <div className="game-card-icon">{game.icon}</div>
      <h3 className="game-card-title">{game.title}</h3>
      <p className="game-card-description">{game.description}</p>
      <div className="game-card-button">Jouer →</div>
    </button>
  )
}