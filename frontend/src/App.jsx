import { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"

function App() {

  return (
    <>
      <Header />
      <ToastContainer position='top-right' autoClose={2000} />
      <Routes>
        <Route path='/admin/login' element={<AdminLogin/>} />
      </Routes>
    </>
  )
}

export default App
