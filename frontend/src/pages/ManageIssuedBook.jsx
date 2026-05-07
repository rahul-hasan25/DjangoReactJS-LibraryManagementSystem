import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ManageIssuedBook = () => {
    const [issues, setIssues] = useState([]);
    
    const [loadingList,setLoadingList] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchIssues();
        }
    }, []);

    const fetchIssues = async()=> {
        setLoadingList(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/admin/issued-books/");
            setIssues(res.data);
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Issued Books')
        }
        finally {
            setLoadingList(false);
        }
    }
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row mb-4'>
                <div className='mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-4'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-layer-group text-primary'></i> Manage Issued Books
                        </h4>
                        <p className='text-muted small'>View all issued Books, their status and return details.</p>
                    </div>
                    <button onClick={()=>navigate("/admin/issued-books")} className='btn btn-outline-primary btn-sm'><i className='fa-solid fa-plus'></i> Issue New Books</button>
                </div>
            </div>

            <div className='card border-0 shadow-sm'>
                <div className='card-body p-4'>
                    { loadingList ? (
                        <div className='text-center py-4'>
                            <div className='spinner-border text-primary'></div>
                        </div>
                    ) : issues.length === 0 ? (<p className="text-muted small">No issued books found.</p>)
                    : (
                        <div className="table-responsive">
                            <table className='table table-striped table-hover align-middle'>
                                <thead className='small text-muted'>
                                    <tr>
                                        <th>#</th>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Book Name</th>
                                        <th>ISBN Number</th>
                                        <th>Issued Date</th>
                                        <th>Return Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {issues.map((issue,index) => (
                                        <tr key={issue.id}>
                                            <td>{index+1}</td>
                                            <td>{issue.student_id}</td>
                                            <td> {issue.student_name} </td>
                                            <td>{issue.book_title}</td>
                                            <td>{issue.book_isbn}</td>
                                            <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                                            <td>
                                                {issue.is_returned ? (new Date(issue.returned_at).toLocaleDateString()) : (<span className='badge bg-danger'>Not Returned</span>)}
                                            </td>
                                            <td>
                                                <button onClick={()=>navigate(`/admin/issued-books/${issue.id}`)} className='btn btn-sm btn-outline-info'>
                                                    <i className='fa-solid fa-pen-to-square me-1'></i> Return Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageIssuedBook
