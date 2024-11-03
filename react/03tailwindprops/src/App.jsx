import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
function App() {

  return (
    <>
      <h1 className="text-3xl font-mono font-bold bg-yellow-500 p-5 rounded-md">Vite with Tailwind!😁</h1>

      <Card username="Mihir Jadhav"/>
    </>
  )
}

export default App
