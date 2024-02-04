export default function GameOver({ onRestart, winner, hasDraw }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {!hasDraw && <p>{winner} wins!</p>}
      {hasDraw && <p>It's a draw</p>}
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}
