import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ManageStudents = () => {
    const [students, setStudents] = useState([]);

    const [loadingList,setLoadingList] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchStudents();
        }
    }, []);

    const fetchStudents = async()=> {
        setLoadingList(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/admin/students/");
            setStudents(res.data);
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Students')
        }
        finally {
            setLoadingList(false);
        }
    }

    const handleToggleStatus = async(student) => {
        const isCurrentlyActive = student.is_active;
        
        const url = isCurrentlyActive ? `http://127.0.0.1:8000/api/admin/block_student/${student.id}/` : `http://127.0.0.1:8000/api/admin/activate_student/${student.id}/`;
        
        const confirmMessage = isCurrentlyActive ? `Are you sure you want to block ${student.full_name}?` : `Are you sure you want to activate ${student.full_name}?`;
        
        if(!window.confirm(confirmMessage)){
            return;
        }

        try {
            await axios.put(url);
            fetchStudents();
        } catch(err) {
            console.error(err);
            toast.error('Failed to Update Student Status!');
        }
    }
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row mb-4'>
                <div className='mx-auto d-flex justify-content-between align-items-center'>
                    <div className='mb-4'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-layer-group text-primary'></i> Manage Students
                        </h4>
                        <p className='text-muted small'>View all registered Students and Block or Activate Students.</p>
                    </div>
                    <button onClick={()=>navigate("/admin/issued-books")} className='btn btn-outline-primary btn-sm'><i className='fa-solid fa-plus'></i> Issued Books</button>
                </div>
            </div>

            <div className='card border-0 shadow-sm rounded-4'>
                <div className='card-body p-4'>
                    { loadingList ? (
                        <div className='text-center py-4'>
                            <div className='spinner-border text-primary'></div>
                        </div>
                    ) : students.length === 0 ? (<p className="text-muted small">No registered students found.</p>)
                    : (
                        <div className="table-responsive">
                            <table className='table table-striped table-hover align-middle'>
                                <thead className='small text-muted'>
                                    <tr>
                                        <th>#</th>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Reg Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students.map((student,index) => (
                                        <tr key={student.id}>
                                            <td>{index+1}</td>
                                            <td>{student.student_id}</td>
                                            <td> {student.full_name} </td>
                                            <td>{student.email}</td>
                                            <td>{student.mobile}</td>
                                            <td>{new Date(student.created_at).toLocaleDateString()}</td>
                                            <td>
                                                { student.is_active ? 
                                                (
                                                    <span className='badge bg-success-subtle text-success border border-success-subtle'>Active</span>
                                                ) 
                                                :                                                                
                                                (
                                                    <span className='badge bg-secondary-subtle text-secondary border border-secondary-subtle'>Inactive</span>
                                                )}
                                            </td>
                                            
                                            <td className='text-center d-flex'>
                                                <button onClick={()=>handleToggleStatus(student)} className={student.is_active ? 'btn btn-sm btn-outline-danger me-2' : 'btn btn-sm btn-outline-success me-2'}>
                                                    {student.is_active ? 'Block' : 'Activate'}
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

export default ManageStudents
