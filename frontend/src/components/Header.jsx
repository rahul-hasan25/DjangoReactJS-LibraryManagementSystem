import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation();

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
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive("/")}`} aria-current="page" to="/"><i className='fa-solid fa-home me-1'></i>Home</Link>
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
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header