import { useState } from 'react'
import './Morpion.css'




type SquareValue = "X" | "O" | null;

function Square({value, onClick}: {value: SquareValue, onClick: () => void}) {

  return <button  onClick={onClick} className="square">{value}</button>;
  
}

function calculateWinner(squares : SquareValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: SquareValue[], onPlay: (nextSquares: SquareValue[]) => void }) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (squares.every(square => square !== null) && !winner) {
    status = 'Match nul';
  } else if (winner) {
    status = winner + ' a gagné';
  } else {
    status = 'Prochain tour : ' + (xIsNext ? 'X' : 'O');
  }

  return (
  <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
  </>
  )
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: SquareValue[]) : void {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className='morpion-wrapper'>
    <h1 className="title">Morpion</h1>
    <div className="game">
     
      <div className="game-info">
        <ol className="ol-history">
          {history.map((currentSquares, move) => {
            const desc = move ? 'Coup n°' + move : 'Recommencer';
            return (
              <li key={move}>
                <button onClick={() => {
                  setHistory(history.slice(0, move + 1));
                  setXIsNext(move % 2 === 0);
                }}>
                  {desc}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

       <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
    </div>
  </div>
  );
}