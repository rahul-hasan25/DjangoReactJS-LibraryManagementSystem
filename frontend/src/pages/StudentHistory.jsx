import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const StudentHistory = () => {
    const {studentId} = useParams();

    const [student, setStudent] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchHistory();
        }
    }, []);

    const fetchHistory = async()=> {
        setLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/admin/student-history/${studentId}/`);
            setStudent(res.data.student);
            setIssues(res.data.issues);
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Student History');
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
                            <i className='fa-solid fa-book text-primary'></i> Book Issued History
                        </h4>
                        <p className='text-muted small'>
                            {student ? `History of ${student.full_name} (ID: ${student.student_id}) - ${student.email}` : 'Loading Student Details...'}
                        </p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button onClick={()=>navigate("/admin/manage_students")} className='btn btn-outline-primary btn-sm me-1'><i className="bi bi-arrow-left"></i> Back to Students</button>
                        <button onClick={()=>navigate("/admin/issued-books")} className='btn btn-outline-primary btn-sm'><i className='fa-solid fa-plus'></i> Issue Books</button>
                    </div>
                </div>
            </div>

            <div className='card border-0 shadow-sm rounded-4'>
                <div className='card-body p-4'>
                    { loading ? (
                        <div className='text-center py-4'>
                            <div className='spinner-border text-primary'></div>
                        </div>
                    ) : issues.length === 0 ? (<p className="text-muted small">No issued book found for the student.</p>)
                    : (
                        <div className="table-responsive">
                            <table className='table table-striped table-hover align-middle'>
                                <thead className='small text-muted'>
                                    <tr>
                                        <th>#</th>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Issued Book</th>
                                        <th>Issued Date</th>
                                        <th>Returned Date</th>
                                        <th>Fine (BDT)</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {issues.map((issue,index) => (
                                        <tr key={issue.id}>
                                            <td>{index+1}</td>
                                            <td>{issue.student_id}</td>
                                            <td> {issue.student_name} </td>
                                            <td>{issue.book_title}</td>
                                            <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                                            <td>
                                                {issue.is_returned ? (new Date(issue.returned_at).toLocaleDateString()) : (<span className='badge bg-danger'>Not Returned</span>)}
                                            </td>
                                            <td>
                                                {issue.is_returned ? (issue.fine) : (<span className='badge bg-info'>Not Returned Yet</span>)}
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

export default StudentHistory
