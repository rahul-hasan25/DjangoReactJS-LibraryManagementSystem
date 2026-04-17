import { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/admin/login' element={<AdminLogin/>} />
      </Routes>
    </>
  )
}

export default App
