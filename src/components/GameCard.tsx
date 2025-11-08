import type { Game } from '../types/Game'

interface GameCardProps {
  game: Game
  onSelect: (gameId: string) => void
}

export default function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <button onClick={() => onSelect(game.id)} style={styles.card}>
      <div style={styles.icon}>{game.icon}</div>
      <h3 style={styles.title}>{game.title}</h3>
      <p style={styles.description}>{game.description}</p>
      <div style={styles.button}>Jouer →</div>
    </button>
  )
}

const styles = {
  card: {
    display: 'block',
    width: '100%',
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center' as const,
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  description: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    display: 'inline-block',
  }
}