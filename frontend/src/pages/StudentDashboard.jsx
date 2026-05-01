import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [stats, setStats] = useState({
        total_books : 0,
        total_issued : 0,
        not_returned : 0
    });

    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
        if(!studentUser) {
            navigate("/user/login");
            return;
        }
        const fetchStats = async() => {
            try {
                setLoading(true);
                const res = await axios.get("http://127.0.0.1:8000/api/user_stats/", {
                    params: {student_id: studentUser.student_id}
                });
                setStats(res.data.stats);
            } catch(err) {
                console.error(err);
                toast.error("Failed to fetch stats");
            }
            
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='d-flex flex-wrap justify-content-between align-items-center mb-4'>
                <div>
                    <h3 className='mb-1 d-flex align-items-center gap-2'>
                        <span className='d-inline-flex align-items-center justify-content-center rounded-3' style={{width:"40px", height:'40px', background:'#0f766e1a'}}>
                            <i className='fa-solid fa-user-graduate text-primary'></i>
                        </span>
                        <span>My Library Dashboard</span>
                    </h3>
                    <h6 className='text-muted small mb-1'>Track your issued books, pending returns and explore all books in the library.</h6>
                </div>
                <p className='mt-3'>Welcome {studentUser.full_name || 'Guest'}</p>
            </div>

            {loading && (
                <div className='text-center my-5'>
                    <div className='spinner-border text-primary' role='status'></div>
                    <span className='mt-3 text-muted'>Loading...</span>
                </div>
            )}

            {!loading && (
                <div className='row g-4 mb-4'>
                    <div className='col-md-4'>
                        <div className='card border-0 shadow-sm h-100'>
                            <div className='card-body d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div>
                                        <h6 className='text-uppercase text-muted small mb-1'>Total Books</h6>
                                        <h3 className='mb-0'>{stats.total_books}</h3>
                                    </div>

                                    <div className='rounded-circle d-inline-flex align-items-center justify-content-center' style={{height:'42px', width:'42px', background:'#e0e7ff'}}>
                                        <div class="icon-circle bg-light">📚</div>
                                    </div>
                                </div>

                                <p className='mb-0 text-muted small'>All books currently available in the library catalogue.</p>

                                <div className='mt-3'>
                                    <Link to="/user/books" className="small text-primary text-decoration-none">
                                        View Books <i className='fa-solid fa-arrow-right'></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='card border-0 shadow-sm h-100' style={{background:"linear-gradient(135deg, #f97316, #f97316cc, #f59e0b)", color:'white'}}>
                            <div className='card-body d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div>
                                        <h6 className='text-uppercase text-muted small mb-1'>Pending Returns</h6>
                                        <h3 className='mb-0'>{stats.not_returned}</h3>
                                    </div>

                                    <div className='rounded-circle d-inline-flex align-items-center justify-content-center' style={{height:'42px', width:'42px', background:'#e0e7ff'}}>
                                        <div class="icon-circle bg-white text-dark">⏱</div>
                                    </div>
                                </div>

                                <p className='mb-0 text-muted small'>Books you've issued but not returned yet. Please return on time to avoid fines.</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='card border-0 shadow-sm h-100'>
                            <div className='card-body d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div>
                                        <h6 className='text-uppercase text-muted small mb-1'>Total Books Issued</h6>
                                        <h3 className='mb-0'>{stats.total_issued}</h3>
                                    </div>

                                    <div className='rounded-circle d-inline-flex align-items-center justify-content-center' style={{height:'42px', width:'42px', background:'#e0e7ff'}}>
                                        <div class="icon-circle bg-light">📗</div>
                                    </div>
                                </div>

                                <p className='mb-0 text-muted small'>Count of all books ever issued on your student account.</p>

                                <div className='mt-3'>
                                    <Link to="/user/books" className="small text-primary text-decoration-none">
                                        View issue history <i className='fa-solid fa-arrow-right'></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-12'>
                        <div className='card border-0 shadow-sm h-100'>
                            <div className='card-body d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center mb-0'>
                                    <div>
                                        <strong>💡 Tip</strong>
                                        <p class="mb-0 text-muted">
                                            Regularly check your pending returns to avoid late fines and keep your library account in good standing.
                                        </p>
                                    </div>

                                    <Link to="/user/issued-books" class="btn btn-outline-primary">Go to issued books</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default StudentDashboard
