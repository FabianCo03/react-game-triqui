import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o',
}

const Square = ({ children, updateBoard, index }) => {
  return <div className='square' key={index}> {children} </div>
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurns] = useState(TURNS.X)

  return (
    <main className='board'>
      <h1>Triqui</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
                <Square
                  key={index}
                  index={index}
                  >
                    {board[index]}
                </Square>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
