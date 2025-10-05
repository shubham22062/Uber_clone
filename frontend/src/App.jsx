import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Start from './pages/Start'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
      </Routes>
    </div>
  )
}

export default App
