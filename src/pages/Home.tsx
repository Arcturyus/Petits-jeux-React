import { games } from '../data/games'
import GameCard from '../components/GameCard'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()
  return (
    <div className="home-page-games-grid">
        {/* Grille des jeux */}
            {games.map((game) => (
            <GameCard 
                key={game.id} 
                game={game} 
                onSelect={(id) => navigate(`/game/${id}`)}
            />
            ))}
    </div>
  )
}