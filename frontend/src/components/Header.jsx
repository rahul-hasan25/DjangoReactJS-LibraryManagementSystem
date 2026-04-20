import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const location = useLocation();
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();

    const handleLogout = ()=> {
        navigate('/admin/login')
    }

    const isActive = (path) => {
        return location.pathname === path ? "active text-primary fw-semibold" : "";
    }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
        <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                <span className='rounded-circle d-inline-flex align-items-center justify-content-center' style={{background:'#4f46e5', color:'white', width:'36px', height:'36px'}}>
                    <i className='fa-solid fa-book-open-reader'></i>
                </span>
                <span className='fw-bold'>StudyX Library</span>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto d-flex align-items-center">
                    {/* Not Admin User */}
                    { !adminUser && (
                        <>
                        <li className="nav-item">
                            <Link className={`nav-link d-flex align-items-center gap-1 ${isActive("/")}`} aria-current="page" to="/"><i className='fa-solid fa-home me-1'></i>Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/user/login")}`} to="/user/login"><i className='fa-solid fa-user me-1'></i>User Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/user/signup")}`} to="/user/signup"><i className='fa-solid fa-user-plus me-1'></i>User Signup</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="btn btn-primary" to="/admin/login"><i className='fa-solid fa-shield-halved me-1'></i>Admin Login</Link>
                        </li>
                        </>
                    )}

                    {/* # Admin */}
                    { adminUser && (
                        <>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/admin/dashboard")}`} to="/admin/dashboard"><i className='fa-solid fa-gauge-high me-1'></i>Dashboard</Link>
                        </li>

                        <li className='nav-item dropdown'>
                            <button className='nav-link dropdown-toggle d-flex align-items-center gap-1' data-bs-toggle='dropdown'>
                                <i className='fa-solid fa-layer-group me-1'></i> Categories
                            </button>
                            <ul className='dropdown-menu dropdown-menu-end'>
                                <li>
                                    <Link className="dropdown-item" to="/admin/category_add"><i className='fa-solid fa-plus me-1'></i>Add Category</Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" to="/admin/category_manage"><i className='fa-solid fa-list me-1'></i>Manage Category</Link>
                                </li>
                            </ul>
                        </li>

                        <li className='nav-item dropdown'>
                            <button className='nav-link dropdown-toggle d-flex align-items-center gap-1' data-bs-toggle='dropdown'>
                                <i className='fa-solid fa-user-pen me-1'></i> Authors
                            </button>
                            <ul className='dropdown-menu dropdown-menu-end'>
                                <li>
                                    <Link className="dropdown-item" to="/admin/author_add"><i className='fa-solid fa-plus me-1'></i>Add Author</Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" to="/admin/category_add"><i className='fa-solid fa-list me-1'></i>Manage Author</Link>
                                </li>
                            </ul>
                        </li>

                        <li className='nav-item dropdown'>
                            <button className='nav-link dropdown-toggle d-flex align-items-center gap-1' data-bs-toggle='dropdown'>
                                <i className='fa-solid fa-book me-1'></i> Books
                            </button>
                            <ul className='dropdown-menu dropdown-menu-end'>
                                <li>
                                    <Link className="dropdown-item" to="/admin/category_add"><i className='fa-solid fa-plus me-1'></i>Add Book</Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" to="/admin/category_add"><i className='fa-solid fa-list me-1'></i>Manage Book</Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item" to="/admin/category_add"><i className='fa-solid fa-arrow-right-arrow-left me-1'></i>Issued Book</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/admin/dashboard")}`} to="/admin/dashboard"><i className='fa-solid fa-right-from-bracket me-1'></i>Issue Book</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/admin/dashboard")}`} to="/admin/dashboard"><i className='fa-solid fa-users me-1'></i>Students</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive("/admin/dashboard")}`} to="/admin/dashboard"><i className='fa-solid fa-key me-1'></i>Change Password</Link>
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-outline-danger btn-sm" to="/admin/dashboard" onClick={handleLogout}><i className='fa-solid fa-right-from-bracket me-1'></i>Logout</button>
                        </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header