import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentChangePassword = () => {
    const [form, setForm] = useState({
        current_password : "",
        new_password  : "",
        confirm_password : "",
    });
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const studentUser = JSON.parse(localStorage.getItem("studentUser"));

    useEffect(() => {
        if(!studentUser) {
            navigate("/user/login");
            return;
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name] : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(form.new_password !== form.confirm_password) {
            toast.error('New Password and Confirm Password do not match!');
            return;
        }

        try {
            setSaving(true);
            const res = await axios.post("http://127.0.0.1:8000/api/user/change_password/", {
                student_id : studentUser.student_id,
                current_password : form.current_password,
                new_password : form.new_password,
                confirm_password : form.confirm_password
            });
            toast.success(res.data.message || "Password Changed successfully!");

            setForm({
                current_password : "",
                new_password : "",
                confirm_password : ""
            });
        } catch(err){
            console.error(err);
            toast.error('Failed to Change Password!');
        }

        finally {
            setSaving(false);
        }
    };
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='d-flex flex-wrap justify-content-between align-items-center mb-4'>
                <div>
                    <h3 className='mb-1 d-flex align-items-center gap-2'>
                        <span className='d-inline-flex align-items-center justify-content-center rounded-3' style={{width:"40px", height:'40px', background:'#0f766e1a'}}>
                            <i className='fa-solid fa-key text-primary'></i>
                        </span>
                        <span>Change Password</span>
                    </h3>
                    <p className='text-muted small mb-1'>Change your Account Password.</p>
                </div>
                <p className='mt-3'>Welcome {studentUser.full_name || 'Guest'}</p>
            </div>

            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow-sm border-0 rounded-3'>
                        <div className='card-body p-4'>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="current_password" className='form-label'>Current Password</label>
                                    <input type="password" className='form-control' id='current_password' name='current_password' value={form.current_password} onChange={handleChange} required />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor="new_password" className='form-label'>New Password</label>
                                    <input type="password" className='form-control' id='new_password' name='new_password' value={form.new_password} onChange={handleChange} required />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor="confirm_password" className='form-label'>Confirm Password</label>
                                    <input type="password" className='form-control' id='confirm_password' name='confirm_password' value={form.confirm_password} onChange={handleChange} required />
                                </div>

                                <button type='submit' disabled={saving} className={`btn ${saving ? 'btn-secondary' : 'btn-primary'} w-100`}>
                                    {saving ? (
                                        <><span className='spinner-border spinner-border-sm me-2'></span>Updating...</>
                                    ) : (
                                        <><i className='fa fa-key me-2'></i>Update Password</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentChangePassword
