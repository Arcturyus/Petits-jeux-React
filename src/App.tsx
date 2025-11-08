// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GamePage from './pages/GamePage'
import { games } from './data/games'

export default function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/game/:gameId" 
            element={<GamePageWrapper />} 
          />
        </Routes>
      </div>
  )
}



// Petit wrapper pour récupérer l'ID du jeu et le passer à GamePage
import { useParams, useNavigate } from 'react-router-dom'

function GamePageWrapper() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const game = games.find(g => g.id === gameId)

  if (!game) {
    return <div>Jeu introuvable</div>
  }

  return (
    <GamePage 
      game={game} 
      onBack={() => navigate('/')} 
    />
  )
}
