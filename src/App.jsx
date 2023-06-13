import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className} key={index}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turn // X ó O
    setBoard(newBoard)

    // debemos asegurarnos de cambiar el turno entre uno y otro
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
  }

  return (
    <main className="board">
      <h1>Triqui</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            // ¿ por qué se pasa la función y no la ejecución ?
            // porque no quiero ejecutar la función (ejemplo: updateBoard()); en este caso si hago esto, se me ejecutará 9 veces al recargar, y debo ejecutarlo solo cuando lo necesite
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>

        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
