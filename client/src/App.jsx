import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router'
import Layout from './components/Layout'
import HomePage from './components/pages/HomePage'
import Direction from './components/pages/Direction'
import LandingPage from './components/pages/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/direction' element={<Direction/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
