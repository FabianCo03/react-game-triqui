import { useState } from "react";
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameToStorage } from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
      
    if (boardFromStorage && boardFromStorage != 'undefined') {
        return JSON.parse(boardFromStorage)
      } else {
        return Array(9).fill(null)
      } 
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });

  const [winner, setWinner] = useState(null) // null es que NO hay ganador, FALSE es empate

  const resetGame = () => {
    // pasar las mismas prop y que tengan el mismo estado y así la interfaz se replica. Se resetea el estado
    setBoard(Array(9).fill(null));
    // setTurn(TURNS.O)
    setWinner(null)
    resetGameToStorage()
  }

  const [count, setCount] = useState(0)
  const [countX, setCountX] = useState(0)
  const [countO, setCountO] = useState(0)
  const [countTie, setCountTie] = useState(0)
  
  

  const updateBoard = (index) => {
    // para no sobreescribir si ya tiene algo
    if(board[index] || winner) return 
    // actualizar tablero
    const newBoard = [...board]
    // x u o clickeo ese index
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    
    saveGameToStorage({
        board: newBoard,
        turn: newTurn
      })

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)

    } else if(checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
    // contador
    if(newWinner || checkEndGame(newBoard)) {
      setCount(count + 1)
      if(turn == TURNS.X && newWinner == TURNS.X){
        setCountX(countX + 1);
        setTurn(TURNS.O)
      } else if (turn == TURNS.O && newWinner == TURNS.O) {
        setCountO(countO + 1);
        setTurn(TURNS.X)
      } else {
        setCountTie(countTie + 1)
      }
    }
  }
  
  let textCount = 'partida'
  count == 1 ? textCount : textCount += 's'

  return (
    <main className="board">
      <h1>Triqui</h1>
      <h2>Haz jugado {count} {textCount}</h2>

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
        <Square 
          isSelected={turn === TURNS.X}
        >
          {TURNS.X}
          <p className="countPlayers-text">{countX}</p>
        </Square>

        <Square
          isSelected={turn === TURNS.O}
        >
          {TURNS.O}
          <p className="countPlayers-text">{countO}</p>
        </Square>
        
      </section>

      <h3 className="empate">Empates {countTie}</h3>
      
      <button onClick={resetGame}>Reiniciar</button>
  
      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  );
}

export default App;
