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


const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null) //null es que NO hay ganador, FALSE es empate

  const checkWinner = (boardToCheck) => {

    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return //para no sobreescribir

    const newBoard = [...board]
    newBoard[index] = turn // x u o colocó ese index
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      // la actualizacion de los estados son asincronos, quiere decir que no bloquea el codigo que viene después. Por eso acá el alert sale primero que la X en el board
      setWinner(newWinner)
      alert(`Ganador ${newWinner}`)
    }
  }

  return (
    <main className="board">
      <h1>Triqui</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
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
