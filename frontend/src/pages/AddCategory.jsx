import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddCategory = () => {
    const [name,setName] = useState("");
    const [categories,setCategories] = useState([]);
    const [status,setStatus] = useState("1");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchCategories();
        }
    }, []);

    const fetchCategories = async()=> {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/categories/");
            setCategories(res.data);
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Categories')
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/categories/add/", {name,status});
            if (res.data.success){
                toast.success(res.data.message || "Category Created!")
                setName("");
                setStatus("1");
                fetchCategories();
            }
            else {
                toast.error(res.data.message || "Invalid Credentials")
            }
        }
        catch(err) {
            console.error(err);
            toast.error("Invalid Credentials");
        }
        finally {
            setLoading(false);
        }
    }
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row mb-4'>
                <div className='col-md-8 mx-auto'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-layer-group text-primary'></i> Add Category
                        </h4>
                        <p className='text-muted small'>Create new Book Category and manage their active status</p>
                    </div>
                </div>
            </div>

            <div className='row g-4'>
                <div className='col-md-5'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <form onSubmit={handleSubmit} >
                                <div className='mb-3'>
                                    <label className='form-label small fw-medium'>Category Name</label>
                                    <input type="text" className='form-control' placeholder='e.g Programming, Science, Novel' required value={name} onChange={(e)=> setName(e.target.value)} />
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label small fw-medium'>Status</label>
                                    <div className='d-flex gap-3'>
                                        <div className='form-check'>
                                            <input type="radio" className='form-check-input' value='1' checked={status==='1'} onChange={(e)=> setStatus(e.target.value)} id='status-active' name='status' />
                                            <label className='form-check-label small' htmlFor="status-active">Active</label>
                                        </div>

                                        <div className='form-check'>
                                            <input type="radio" className='form-check-input' value='0' checked={status==='0'} onChange={(e)=> setStatus(e.target.value)} id='status-inactive' name='status' />
                                            <label className='form-check-label small' htmlFor="status-inactive">Inactive</label>
                                        </div>
                                    </div>
                                </div>

                                <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                                    { loading ? (<> <span className='spinner-border spinner-border-sm me-2'></span> Creating... </>)
                                    :
                                    (<> <i className='fa-solid fa-plus'></i> Create Category </>)
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='col-md-7'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <h6 className="fw-semibold mb-3">Existing Categories</h6>
                            { categories.length === 0 ? (<p className="text-muted small">No categories found. Add your first category.</p>)
                            : (
                                <div className="table-responsive">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {categories.map((cat,index) => (
                                                <tr key={cat.id}>
                                                    <td>{index+1}</td>
                                                    <td> {cat.name} </td>
                                                    <td>
                                                        { cat.is_active ? 
                                                        (
                                                            <span className='badge bg-success-subtle text-success border border-success-subtle'>Active</span>
                                                        ) 
                                                        :                                                                
                                                        (
                                                            <span className='badge bg-secondary-subtle text-secondary border border-secondary-subtle'>Inactive</span>
                                                        )}
                                                    </td>
                                                    <td>{new Date(cat.created_at).toLocaleDateString()}</td>
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
        </div>
    </div>
  )
}

export default AddCategory