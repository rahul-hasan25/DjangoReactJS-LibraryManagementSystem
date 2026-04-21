import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ManageAuthors = () => {
    const [editId,setEditId] = useState(null);
    const [editName,setEditName] = useState("");
    const [authors,setAuthors] = useState([]);
    const [loadingList,setLoadingList] = useState(false);
    const [saving,setSaving] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchAuthors();
        }
    }, []);

    const fetchAuthors = async()=> {
        setLoadingList(true);
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/authors/");
            setAuthors(res.data);
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Authors')
        }
        finally {
            setLoadingList(false);
        }
    }

    // # Edit Button
    const startEdit = (author) => {
        setEditId(author.id);
        setEditName(author.name);
    }

    const cancelEdit = (author) => {
        setEditId();
        setEditName('');
    }

    // UPDATE Author

    const handleUpdate = async(e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await axios.put(`http://127.0.0.1:8000/api/update_author/${editId}/`, {name:editName});
            if (res.data.success){
                toast.success(res.data.message || "Author Updated!")
                cancelEdit();
                fetchAuthors();
            }
            else {
                toast.error(res.data.message || "Update Failed")
            }
        }
        catch(err) {
            console.error(err);
            toast.error("Something went wrong");
        }
        finally {
            setSaving(false);
        }
    }

    // DELETE Author

    const handleDelete = async(id) => {
        const ok = window.confirm("Are you sure you want to delete this Author?");
        if(!ok) return;
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/delete_author/${id}/`);
            if (res.data.success){
                toast.success(res.data.message || "Author Deleted!")
                setAuthors((prev) => prev.filter((a) => a.id !== id))
            }
            else {
                toast.error(res.data.message || "Delete Failed")
            }
        }
        catch(err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    }

  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row mb-4'>
                <div className='col-md-8 mx-auto'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-layer-group text-primary'></i> Manage Authors
                        </h4>
                        <p className='text-muted small'>View, Edit and Delete Authors from the library system.</p>
                    </div>
                </div>
            </div>

            <div className='row g-4'>
                <div className='col-md-5'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <h6 className='fw-semibold mb-3'>{ editId ? ("Edit Author") : ("Select an Author to edit") }</h6>
                            { editId ? (
                                <form onSubmit={handleUpdate} >
                                    <div className='mb-3'>
                                        <label className='form-label small fw-medium'>Author Name</label>
                                        <input type="text" className='form-control' placeholder='e.g. Rahul Hasan' required value={editName} onChange={(e)=> setEditName(e.target.value)} />
                                    </div>

                                    <button type='submit' className='btn btn-primary w-100' disabled={saving}>
                                        { saving ? (<> <span className='spinner-border spinner-border-sm me-2'></span> Updating... </>)
                                        :
                                        (<> <i className='fa-solid fa-plus'></i> Update </>)
                                        }
                                    </button>
                                </form>
                            ) 
                            : 
                            ( <p className='text-muted small'>Click on the <strong>Edit</strong> Button in the table to modify an Author.</p> )}
                        </div>
                    </div>
                </div>

                <div className='col-md-7'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 className="fw-semibold mb-3">Authors Listing</h6>
                                <button onClick={()=>navigate("/admin/author_add")} className='btn btn-outline-primary btn-sm'><i className='fa-solid fa-plus me-1'></i> Add New</button>
                            </div>

                            { loadingList ? (
                                <div className='text-center py-4'>
                                    <div className='spinner-border text-primary'></div>
                                </div>
                            ) : authors.length === 0 ? (<p className="text-muted small">No Authors found. Add your first Author.</p>)
                            : (
                                <div className="table-responsive">
                                    <table className='table table-striped table-hover'>
                                        <thead className='small text-muted'>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Created</th>
                                                <th>Updated</th>
                                                <th className='text-center'>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {authors.map((author,index) => (
                                                <tr key={author.id}>
                                                    <td>{index+1}</td>
                                                    <td> {author.name} </td>
                                                    <td className='small text-muted'>{new Date(author.created_at).toLocaleDateString()}</td>
                                                    <td className='small text-muted'>{new Date(author.updated_at).toLocaleDateString()}</td>
                                                    <td className='text-center d-flex'>
                                                        <button onClick={()=>startEdit(author)} className='btn btn-sm btn-outline-primary me-2'><i className='fa-solid fa-pen-to-square'></i>Edit</button>
                                                        <button onClick={()=>handleDelete(author.id)} className='btn btn-sm btn-outline-danger'><i className='fa-solid fa-trash-can'></i>Delete</button>
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
        </div>
    </div>
  )
}

export default ManageAuthors
