import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const IssueBook = () => {
    const [studentId, setStudentId] = useState("");
    const [student, setStudent] = useState(null);
    const [bookQuery, setBookQuery] = useState("");
    const [book, setBook] = useState(null);
    const [remark, setRemark] = useState("");

    const [studentLoading, setStudentLoading] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);
    const [issuing, setIssuing] = useState(false);

    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        }
    }, []);

    const handleFetchStudent = async() => {
        if(!studentId){
            toast.error('Please enter student ID');
            return;
        }
        setStudent(null);
        setStudentLoading(true);

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/students/by-id/?student_id=${studentId}/`);
            setStudent(res.data.student);
        } catch(err) {
            console.error(err);
            toast.error('Student not found!');
        }

        finally {
            setStudentLoading(false);
        }
    };

    const handleFetchBook = async() => {
        if(!bookQuery){
            toast.error('Please enter Book Name or ISBN');
            return;
        }
        setBook(null);
        setBookLoading(true);

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/books/lookup/?q=${bookQuery}/`);
            setStudent(res.data.book);
        } catch(err) {
            console.error(err);
            toast.error('Book not found!');
        }

        finally {
            setBookLoading(false);
        }
    };

    const handleIssueBook = async() => {
        if(!student || !book || !remark){
            toast.error('Please fill all fields');
            return;
        }

        if(book.quantity <= 0) {
            toast.error('Book not available (no copies left)');
            return;
        }
        setIssuing(true);

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/issue_book/', {
                student_id : student.id,
                book_id : book.id,
                remark : remark
            });
            toast.success('Book issued successfully!');
            setRemark("");
            setBook(null);
            setStudent(null);
            setStudentId("");
            setBookQuery("");
        } catch(err) {
            console.error(err);
            toast.error('Failed to issue book!');
        }

        finally {
            setIssuing(false);
        }
    };

    const bookCoverUrl = book && book.cover_image ? (book.cover_image.startsWith('http') ? book.cover_image : `http://127.0.0.1:8000${book.cover_image}`) : null;

  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row mb-4'>
                <div className='mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-4'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-layer-group text-primary'></i> Issue a New Book
                        </h4>
                        <p className='text-muted small'>Search Student and Book then issue the Book with a remark.</p>
                    </div>
                    <button onClick={()=>navigate("/admin/issued-books")} className='btn btn-outline-primary btn-sm'><i className='fa-solid fa-plus'></i> Manage Issued Books</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssueBook
