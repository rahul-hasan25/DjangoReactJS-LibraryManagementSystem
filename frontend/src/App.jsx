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
import AddBook from './pages/AddBook'
import ManageBooks from './pages/ManageBooks'
import AdminChangePassword from './pages/AdminChangePassword'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import StudentDashboard from './pages/StudentDashboard'
import StudentBooks from './pages/StudentBooks'
import StudentProfile from './pages/StudentProfile'

function App() {

  return (
    <>
      <Header />
      <ToastContainer position='top-right' autoClose={2000} />
      <Routes>
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/category_add' element={<AddCategory />} />
        <Route path='/admin/category_manage' element={<ManageCategories />} />
        <Route path='/admin/author_add' element={<AddAuthor/>} />
        <Route path='/admin/author_manage' element={<ManageAuthors/>} />
        <Route path='/admin/book_add' element={<AddBook/>} />
        <Route path='/admin/book_manage' element={<ManageBooks/>} />
        <Route path='/admin/change_password' element={<AdminChangePassword/>} />
        <Route path='/user/signup' element={<UserSignup/>} />
        <Route path='/user/login' element={<UserLogin/>} />
        <Route path='/user/dashboard' element={<StudentDashboard/>} />
        <Route path='/user/books' element={<StudentBooks/>} />
        <Route path='/user/profile' element={<StudentProfile/>} />
      </Routes>
    </>
  )
}

export default App
