import { useState, useRef } from "react";

export default function Player() {
  const [name, setName] = useState("")
  const playerName = useRef()
  function handleClick() {
    setName(playerName.current.value);
  }
  return(
    <section id="player">
      <h2>Welcome {name ? name : "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
