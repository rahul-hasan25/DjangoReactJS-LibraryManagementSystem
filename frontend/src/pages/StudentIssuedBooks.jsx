import { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';

const StudentIssuedBooks = () => {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [loading,setLoading] = useState(true);

    const navigate = useNavigate();

    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
        if(!studentUser) {
            navigate("/user/login");
            return;
        }
        const fetchIssuedBooks = async() => {
            try {
                setLoading(true);
                const res = await axios.get("http://127.0.0.1:8000/api/user_issued_books/", {
                    params: {student_id: studentUser.student_id}
                });
                setIssuedBooks(res.data);
            } catch(err) {
                console.error(err);
                toast.error("Failed to fetch Issued Books");
            }
            
            finally {
                setLoading(false);
            }
        };
        fetchIssuedBooks();
    }, []);

    const totalIssued = issuedBooks.length;
    const notReturnedCount = issuedBooks.filter(issue => !issue.is_returned).length;
    const totalFine = issuedBooks.reduce((sum, issue) => sum + (issue.fine || 0), 0);
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='d-flex flex-wrap justify-content-between align-items-center mb-4'>
                <div>
                    <h3 className='mb-1 d-flex align-items-center gap-2'>
                        <span className='d-inline-flex align-items-center justify-content-center rounded-3' style={{width:"40px", height:'40px', background:'#0f766e1a'}}>
                            <i className='fa-solid fa-receipt text-primary'></i>
                        </span>
                        <span>My Issued Books</span>
                    </h3>
                    <h6 className='text-muted small mb-1'>Track all Books you have Issued from the Library along with Return status and Fine.</h6>
                </div>
            </div>

            {loading && (
                <div className='text-center py-5'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            )}

            {!loading && (
                <div className='row g-3 mb-4'>
                    <div className='col-md-4 mb-3'>
                        <div className='card border-0 shadow-sm rounded-4'>
                            <div className='card-body d-flex align-items-center justify-content-between'>
                                <div>
                                    <p className='text-muted text-uppercase small mb-1'>Total Issued Book</p>
                                    <h4 className='mb-0'>{totalIssued}</h4>
                                </div>
                                <span style={{width:'40px', height:'40px', background:'#0f766e1a'}} className='d-inline-flex align-items-center justify-content-center rounded-3'>
                                    <i className='fa-solid fa-book-open text-primary'></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 mb-3'>
                        <div className='card border-0 shadow-sm rounded-4'>
                            <div className='card-body d-flex align-items-center justify-content-between'>
                                <div>
                                    <p className='text-muted text-uppercase small mb-1'>Not Returned</p>
                                    <h4 className='mb-0'>{notReturnedCount}</h4>
                                </div>
                                <span style={{width:'40px', height:'40px', background:'#0f766e1a'}} className='d-inline-flex align-items-center justify-content-center rounded-3'>
                                    <i className='bi bi-clock-history text-primary'></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4 mb-3'>
                        <div className='card border-0 shadow-sm rounded-4'>
                            <div className='card-body d-flex align-items-center justify-content-between'>
                                <div>
                                    <p className='text-muted text-uppercase small mb-1'>Total Fine (BDT)</p>
                                    <h4 className='mb-0'> {totalFine}</h4>
                                </div>
                                <span style={{width:'40px', height:'40px', background:'#0f766e1a'}} className='d-inline-flex align-items-center justify-content-center rounded-3'>
                                    <i className='bi bi-cash-stack text-primary'></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!loading && issuedBooks.length === 0 && (
                <div className='text-center py-5'>
                    <div className='alert alert-info'>
                        <i className='fa-solid fa-info-cicle me-2'></i> No issued Book found!
                    </div>
                </div>
            )}

            {!loading && issuedBooks.length > 0 && (
                <div className='table-responsive border rounded-3'>
                    <table className='table table-hover mb-0'>
                        <thead className='table-light'>
                            <tr>
                                <th>#</th>
                                <th>Book Title</th>
                                <th>ISBN No</th>
                                <th>Issued Date</th>
                                <th>Return Date</th>
                                <th>Fine (BDT)</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {issuedBooks.map((issue, index) => (
                                <tr key={issue.id}>
                                    <td>{index+1}</td>
                                    <td>{issue.book_title}</td>
                                    <td>
                                        <span className='badge bg-soft-secondary text-dark border border-info-subtle'>{issue.book_isbn}</span>
                                    </td>
                                    <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                                    <td>
                                        {issue.is_returned ? (new Date(issue.returned_at).toLocaleDateString()) : (<span className='text-warning'>Not Returned</span>)}
                                    </td>
                                    <td>{issue.fine || 0}</td>
                                    <td className={issue.is_returned ? 'text_success' : 'text-warning'}>
                                        {issue.is_returned ? (<span className='badge bg-info'>Returned</span>) : (<span className='badge bg-warning'>Not Returned</span>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  )
}

export default StudentIssuedBooks
