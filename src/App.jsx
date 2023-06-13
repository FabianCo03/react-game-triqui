import { useState } from "react";
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null) //null es que NO hay ganador, FALSE es empate

  const resetGame = () => {
    // pasar las mismas prop y que tengan el mismo estado y así la interfaz se replica. Se resetea el estado
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return //para no sobreescribir

    const newBoard = [...board]
    newBoard[index] = turn // x u o clickeo ese index
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
      // TODO: check if game is over
    } else if(checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className="board">
      <h1>Triqui</h1>
      
      <section className="game">
        {board.map((square, index) => {
          
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <button onClick={resetGame}>Reiniciar</button>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  );
}

export default App;
