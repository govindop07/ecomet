import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className=''>

      <NavBar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/collection' element */}
      </Routes>
    </div>
  )
}

export default App