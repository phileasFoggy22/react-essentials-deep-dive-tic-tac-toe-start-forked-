export default function Log({ turns, playerX, playerO }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player === "X" ? playerX.name : playerO.name} selected{" "}
          {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
