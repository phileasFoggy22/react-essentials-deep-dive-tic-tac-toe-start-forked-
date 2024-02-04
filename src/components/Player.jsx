import { useState } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  function editName() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, editedName);
    }
  }

  let playerName = <span className="player-name">{editedName}</span>;
  let enterName = (
    <input
      type="text"
      required
      value={editedName}
      onChange={changeName}
    ></input>
  );

  function changeName(event) {
    setEditedName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? enterName : playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editName}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
