import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(gameBaord, playerNames) {}
function App() {
  const [playerNames, setPlayerNames] = useState({
    X: "Boromir",
    O: "Faramir",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  const PLAYERS = {
    X: "X",
    O: "O",
  };
  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const players = [
    { name: "Boromir", symbol: "X", isActive: true },
    { name: "Faramir", symbol: "O", isActive: false },
  ];
  const playerX = players.find((player) => player.symbol === "X");
  const playerO = players.find((player) => player.symbol === "O");
  function deriveGameBoard(setGameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;
  }
  const winner = deriveWinner(gameBoard, playerNames);

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleResterGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }
  const gameBoard = deriveGameBoard(gameTurns);
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  const playerElements = players.map((player) => {
    return (
      <Player
        key={player.name}
        name={player.name}
        symbol={player.symbol}
        isActive={activePlayer === player.symbol}
        onChangeName={handlePlayerNameChange}
      />
    );
  });

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {playerElements}
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            onRestart={handleResterGame}
            hasDraw={hasDraw}
            winner={winner === "X" ? playerX.name : playerO.name}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} playerX={playerX} playerO={playerO} />
    </main>
  );
}

export default App;
