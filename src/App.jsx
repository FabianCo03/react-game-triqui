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

  const resetGame = () => {
    // pasar las mismas prop y que tengan el mismo estado y así la interfaz se replica. Se resetea el estado
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate si no hay más epacios vacíos en el tablero

    // si todas las square del array newBoard tiene que el square es != a null significa que ha terminado el juego con empate

    return newBoard.every((square) => square != null)
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
      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó'
                }
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>
                
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </h2>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
