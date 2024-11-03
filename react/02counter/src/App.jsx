import { useState } from 'react'
import './App.css'

function App() {
  // let counter = 10

  const [counter, setCounter] = useState(0)

  const addValue = () => {
    setCounter(counter + 1)
    console.log(counter);
  }

  const removeValue = () => {
    setCounter( counter - 1)
  }

  return (
    <>
      <h1>A sample counter mini-project. {counter}</h1>
      <h2>Counter : {counter} </h2>
      <button onClick={addValue}>Add Value</button> {" "}
      <button onClick={removeValue}>Remove Value</button> 
      <footer>Result Value : {counter}</footer>
    </>
  )
}

export default App
