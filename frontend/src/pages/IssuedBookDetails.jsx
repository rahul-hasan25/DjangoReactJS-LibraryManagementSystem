import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

const IssuedBookDetails = () => {
    const {id} = useParams();

    const [issue, setIssue] = useState(null);
    const [fine, setFine] = useState("");
    
    const [loading,setLoading] = useState(false);
    const [returning, setReturning] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchDetails();
        }
    }, []);

    const fetchDetails = async()=> {
        setLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/issued-books/${id}/`);
            setIssue(res.data);

            if(res.data.fine){
                setFine(res.data.fine);
            }
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Issued Book Details');
        }
        finally {
            setLoading(false);
        }
    }

    const handleReturn = async() => {
        if(!window.confirm("Are you sure you want to return this book?")){
            return;
        }
        setReturning(true);

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/return_book/${id}/`, {fine:fine});
            toast.success(res.data.message || 'Book returned successfully!');
            fetchDetails();
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to return Book');
        }

        finally {
            setReturning(false);
        }
    }

    const bookCoverUrl = issue && issue.book_cover ? (issue.book_cover.startsWith('http') ? issue.book_cover : `http://127.0.0.1:8000${issue.book_cover}`) : null;

    if(loading || !issue){
        return (
            <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
                <div className='spinner-border text-primary'></div>
            </div>
        )
    }
  return (
    <div className="py-4" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row'>
                <div className='mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-1'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-layer-group text-primary'></i> Issued Book Details
                        </h4>
                        <p className='text-muted small'>View Student and Book details, return status and fine information.</p>
                    </div>
                    <button onClick={()=>navigate("/admin/manage-issued-books")} className='btn btn-outline-primary btn-sm'> Back to List</button>
                </div>
            </div>

            <div className='row g-4'>
                <div className='col-md-6'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <h5 className='fw-semibold mb-3'>Student Details</h5>
                            <hr />
                            <p className='mb-1'>
                                <strong>Student ID: </strong> {issue?.student_id}
                            </p>

                            <p className='mb-1'>
                                <strong>Student Name: </strong> {issue?.student_name}
                            </p>

                            <p className='mb-1'>
                                <strong>Fine: </strong> {issue?.fine ? `BDT ${issue?.fine}` : "No Fine recorded yet"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-3'>
                            <h5 className='fw-semibold mb-1'>Book Details</h5>
                            <hr />
                            {bookCoverUrl && (
                                <img src={bookCoverUrl} alt={issue.book_title} style={{width:'70px', height:'90px', objectFit:'cover', borderRadius:'4px', marginBottom:'15px'}} />
                            )}

                            <p className='mb-1'>
                                <strong>Book Name: </strong> {issue.book_title}
                            </p>

                            <p className='mb-1'>
                                <strong>Book ISBN: </strong> {issue.book_isbn}
                            </p>

                            <p className='mb-1'>
                                <strong>Issue Date: </strong> {new Date(issue.issued_at).toLocaleDateString()}
                            </p>

                            <p className='mb-1'>
                                <strong>Return Date: </strong> {issue.returned_at ? new Date(issue.returned_at).toLocaleDateString() : 'Not returned yet'}
                            </p>
                        </div>
                    </div>

                    <div className='card border-0 shadow-none rounded-4 mt-2'>
                        <div className='card-body p-4'>
                            <h5 className='fw-semibold mb-3'>Return Book</h5>
                            <hr />

                            {issue.is_returned ? (<p className='text-success small mb-0'>This book has already been returned. Fine: <strong>BDT {issue.fine || 0}</strong></p>) : (
                                <>
                                <div className='mb-3'>
                                    <label htmlFor="fine" className='form-label small fw-medium'>Fine Amount (If Any)</label>
                                    <input type="number" id='fine' className='form-control' placeholder='Enter Fine Amount, e.g. 0 or 50' value={fine} onChange={(e)=>setFine(e.target.value)} />
                                </div>

                                <button onClick={handleReturn} className='btn btn-primary' disabled={returning}>
                                    {returning ? (<><span className='spinner-border spinner-border-sm me-2'></span>Processing...</>) :(
                                        <> <i className='bi bi-check-circle-fill me-2'></i>Return Book </>
                                    )}
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssuedBookDetails
