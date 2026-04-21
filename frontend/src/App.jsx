import { useState } from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory'
import ManageCategories from './pages/ManageCategories'
import AddAuthor from './pages/AddAuthor'
import ManageAuthors from './pages/ManageAuthors'

function App() {

  return (
    <>
      <Header />
      <ToastContainer position='top-right' autoClose={2000} />
      <Routes>
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/category_add' element={<AddCategory />} />
        <Route path='/admin/category_manage' element={<ManageCategories />} />
        <Route path='/admin/author_add' element={<AddAuthor/>} />
        <Route path='/admin/author_manage' element={<ManageAuthors/>} />
      </Routes>
    </>
  )
}

export default App
