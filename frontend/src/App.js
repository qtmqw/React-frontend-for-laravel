import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts'
import Er from './pages/404'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/*" element={<Er />} />
      </Routes>
    </>
  )
}

export default App