import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const adminUser = localStorage.getItem('adminUser');

  useEffect(() => {
    if(!adminUser){
      navigate('/admin/login');
      return;
    } else {
      fetchStats();
    }
  }, []);

  const fetchStats = async()=> {
    setLoading(true);

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/stats/");
      setStats(res.data);
    }
    catch(err) {
      console.error(err);
      toast.error('Faild to fetch ADMIN stats.');
    }

    finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
          <div className='row mb-4'>
              <div className='mx-auto d-flex justify-content-between align-items-center'>
                  <div className='mb-4'>
                    <h4 className='fw-semibold mb-1'>
                        <i className='fa-solid fa-gauge-high text-primary'></i> Admin Dashboard
                    </h4>
                    <p className='text-muted small'>
                        Quick overview of Students, Books and Issued records.
                    </p>
                  </div>
                  <div className='badge bg-primary-subtle text-primary py-2 px-3 rounded-pill'>
                    <i className='fa-solid fa-shield-halved'></i> Admin Panel
                  </div>
              </div>
          </div>

          {loading && (
            <div className='text-center py-5'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}

          {!loading && stats && (
            <>
            <div className='row g-3 mb-4'>
              <div className='col-md-4'>
                <div className='card border-0 shadow-sm h-100 rounded-4'>
                  <div className='card-body d-flex'>
                    <div className='me-3 d-flex align-items-center'>
                      <span style={{height:'50px', width:'50px', background:'#eef2ff', color:'#4f46e5'}} className='rounded-circle d-inline-flex align-items-center justify-content-center'>
                        <i className='fa-solid fa-user-graduate'></i>
                      </span>
                    </div>

                    <div>
                      <p className='text-muted text-uppercase small mb-1'>Total Students</p>
                      <h3 className='fw-semibold mb-1'> {stats.total_students} </h3>
                      <p className='small mb-0'>
                        Active: <span className='text-success fw-semibold'> {stats.active_students} </span>
                        &nbsp; 
                        Blocked: <span className='text-danger fw-semibold'> {stats.blocked_students} </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='card border-0 shadow-sm h-100 rounded-4'>
                  <div className='card-body d-flex'>
                    <div className='me-3 d-flex align-items-center'>
                      <span style={{height:'50px', width:'50px', background:'#eef2ff', color:'#4f46e5'}} className='rounded-circle d-inline-flex align-items-center justify-content-center'>
                        <i className='fa-solid fa-book-open'></i>
                      </span>
                    </div>

                    <div>
                      <p className='text-muted text-uppercase small mb-1'>Total Books</p>
                      <h3 className='fw-semibold mb-1'> {stats.total_books} </h3>
                      <p className='small mb-0'>
                        Available: <span className='text-success fw-semibold'> {stats.available_books} </span>
                        &nbsp;
                        Out of Stock: <span className='text-danger fw-semibold'> {stats.out_of_stock_books} </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='card border-0 shadow-sm h-100 rounded-4'>
                  <div className='card-body d-flex'>
                    <div className='me-3 d-flex align-items-center'>
                      <span style={{height:'50px', width:'50px', background:'#eef2ff', color:'#4f46e5'}} className='rounded-circle d-inline-flex align-items-center justify-content-center'>
                        <i className='fa-solid fa-arrow-right-arrow-left'></i>
                      </span>
                    </div>

                    <div>
                      <p className='text-muted text-uppercase small mb-1'>Issued Records</p>
                      <h3 className='fw-semibold mb-1'> {stats.total_issued} </h3>
                      <p className='small mb-0'>
                        Currently Issued: <span className='text-success fw-semibold'> {stats.currently_issued} </span>
                        &nbsp;
                        Returned: <span className='text-danger fw-semibold'> {stats.returned_count} </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row g-3'>
              <div className='col-md-6'>
                <div className='card border-0 shadow-sm h-100 rounded-4'>
                  <div className='card-body d-flex'>
                    <div className='me-3 d-flex align-items-center'>
                      <span style={{height:'50px', width:'50px', background:'#eef2ff', color:'#4f46e5'}} className='rounded-circle d-inline-flex align-items-center justify-content-center'>
                        <i className='fa-solid fa-layer-group'></i>
                      </span>
                    </div>

                    <div>
                      <p className='text-muted text-uppercase small mb-1'>Categories</p>
                      <h3 className='fw-semibold mb-1'> {stats.total_categories} </h3>
                      <p className='small text-muted mb-0'>
                        Different genres and classifications of books available in the library.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card border-0 shadow-sm h-100 rounded-4'>
                  <div className='card-body d-flex'>
                    <div className='me-3 d-flex align-items-center'>
                      <span style={{height:'50px', width:'50px', background:'#eef2ff', color:'#4f46e5'}} className='rounded-circle d-inline-flex align-items-center justify-content-center'>
                        <i className='fa-solid fa-user-pen'></i>
                      </span>
                    </div>

                    <div>
                      <p className='text-muted text-uppercase small mb-1'>Authors</p>
                      <h3 className='fw-semibold mb-1'> {stats.total_authors} </h3>
                      <p className='small text-muted mb-0'>
                        Writers and Contributors of the books available in the library.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          )}
        </div>
    </div>
  )
}

export default AdminDashboard
