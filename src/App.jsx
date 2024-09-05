import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combo.js"
import GameOver from "./Components/GameOver.jsx";

const intitalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function deriverdGameBoard(gameTurns) {
  let gameBoard = [...intitalGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combo of WINNING_COMBINATIONS) {
    const firstSqsym = gameBoard[combo[0].row][combo[0].column]
    const secSqsym = gameBoard[combo[1].row][combo[1].column]
    const thirdSqsym = gameBoard[combo[2].row][combo[2].column]

    if (firstSqsym &&
      firstSqsym === secSqsym &&
      firstSqsym === thirdSqsym) {
      winner = players[firstSqsym];
    }
  }
  return winner;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriverdGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)


  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSq(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
        , ...prevTurns
      ]
      return updatedTurns;
    });
  }


  function handleRematch() {
    setGameTurns([])
  }

  function handleplNameCh(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          initalName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer === 'X'}
          onChangeName={handleplNameCh}
          />
          <Player 
          initalName={PLAYERS.O} 
          symbol="O" 
          isActive={activePlayer === 'O'} 
          onChangeName={handleplNameCh}
          />
        </ol>

        {(winner || hasDraw) && <GameOver onReset={handleRematch} winner={winner}
          onChangeName={handleplNameCh}
        />}

        <GameBoard onSelectSquare={handleSelectSq} board={gameBoard} />

      </div>

      <Log turns={gameTurns} />

    </main>
  )
}
export default App
