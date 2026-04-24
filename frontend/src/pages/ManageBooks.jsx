import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ManageBooks = () => {
    const [books,setBooks] = useState([]);
    const [categories,setCategories] = useState([]);
    const [authors,setAuthors] = useState([]);
    const [editId,setEditId] = useState(null);
    const [editTitle,setEditTitle] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editAuthor, setEditAuthor] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editQuantity, setEditQuantity] = useState("");
    const [editImageFile, setEditImageFile] = useState(null);
    const [editImagePreview, setEditeImagePreview] = useState(null);

    const [loadingList,setLoadingList] = useState(false);
    const [saving,setSaving] = useState(false);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchAll();
        }
    }, []);

    const fetchAll = async()=> {
        setLoadingList(true);
        try {
            const [booksRes, categoriesRes, authorsRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/books/"),
                axios.get("http://127.0.0.1:8000/api/categories/"),
                axios.get("http://127.0.0.1:8000/api/authors/"),
            ]);
            setBooks(booksRes.data);
            setCategories(categoriesRes.data)
            setAuthors(authorsRes.data);
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
    const startEdit = (book) => {
        setEditId(book.id);
        setEditTitle(book.title);
        setEditCategory(book.category);
        setEditAuthor(book.author);
        setEditPrice(book.price);
        setEditQuantity(book.quantity);
        setEditeImagePreview(`http://127.0.0.1:8000${book.cover_image}`);
        setEditImageFile(null);
    }

    const cancelEdit = (author) => {
        setEditId(null);
        setEditTitle("");
        setEditCategory("");
        setEditAuthor("");
        setEditPrice("");
        setEditQuantity("");
        setEditeImagePreview(null);
        setEditImageFile(null);
    }

    const handleImageChange = (e)=> {
        const file = e.target.files[0];
        if(file){
            setEditImageFile(file);
            setEditeImagePreview(URL.createObjectURL(file));
        }
    }

    // UPDATE Author

    const handleUpdate = async(e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('category', editCategory);
            formData.append('author', editAuthor);
            formData.append('price', editPrice);
            formData.append('quantity', editQuantity);
            if(editImageFile){
                formData.append('cover_image', editImageFile);
            }

            const res = await axios.put(`http://127.0.0.1:8000/api/update_book/${editId}/`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });

            if (res.data.success){
                toast.success(res.data.message || "Book Updated!")
                cancelEdit();
                fetchAll();
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
        const ok = window.confirm("Are you sure you want to delete this Book?");
        if(!ok) return;
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/delete_book/${id}/`);
            if (res.data.success){
                toast.success(res.data.message || "Book Deleted!")
                setAuthors((prev) => prev.filter((b) => b.id !== id))
                if(editId === id) {
                    cancelEdit();
                }
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
                            <i className='fa-solid fa-book text-primary'></i> Manage Books
                        </h4>
                        <p className='text-muted small'>View, Edit and Delete Books from the library system.</p>
                    </div>
                </div>
            </div>

            <div className='row g-4'>
                <div className='col-md-4'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <h6 className='fw-semibold mb-3'>{ editId ? ("Edit Book") : ("Select a Book to edit") }</h6>
                            { editId ? (
                                <form onSubmit={handleUpdate} >
                                    <div className='row g-3'>
                                        <div className='col-md-12'>
                                            <label className='form-label small fw-medium'>Book Name</label>
                                            <input type="text" className='form-control' value={editTitle || ""} onChange={(e) => setEditTitle(e.target.value)} placeholder='e.g. Python Programming' required />
                                        </div>

                                        <div className='col-md-12'>
                                            <label className='form-label small fw-medium'>Category</label>
                                            <select className='form-select' value={editCategory} onChange={(e)=>setEditCategory(e.target.value)} required>
                                                <option value="">Select Category</option>
                                                {categories?.map((cat)=>(
                                                    <option value={cat.id} key={cat.id}> {cat.name} </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='col-md-12'>
                                            <label className='form-label small fw-medium'>Author</label>
                                            <select className='form-select' value={editAuthor} onChange={(e)=>setEditAuthor(e.target.value)} required>
                                                <option value="">Select Author</option>
                                                {authors?.map((author)=>(
                                                    <option value={author.id} key={author.id}> {author.name} </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='col-md-6'>
                                            <label className='form-label small fw-medium'>Price</label>
                                            <input type="number" min='0' step='0.01' className='form-control' value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder='e.g. 199.99' required />
                                        </div>

                                        <div className='col-md-6'>
                                            <label className='form-label small fw-medium'>Quantity</label>
                                            <input type="number" min='0' step='1' className='form-control' value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} placeholder='e.g. 50' required />
                                        </div>

                                        <div className='col-md-12'>
                                            <label className='form-label small fw-medium'>Cover Image</label>
                                            {editImagePreview && (
                                                <div className='mb-2'>
                                                    <img style={{maxWidth:"100px", height:"90px", width:"auto"}} src={editImagePreview} alt="Cover Preview" className='img-fluid rounded' />
                                                </div>
                                            )}
                                            <input type="file" accept='image/*' className='form-control' onChange={handleImageChange} />
                                        </div>
                                    </div>

                                    <div className='d-flex gap-2 align-items-center mt-4'>
                                        <button type='submit' className='btn btn-primary mt-3' disabled={saving}>
                                            { saving ? (<> <span className='spinner-border spinner-border-sm me-2'></span> Updating... </>)
                                            :
                                            (<> <i className='fa-solid fa-plus'></i> Update </>)
                                            }
                                        </button>
                                        <button onClick={cancelEdit} type='button' className='btn btn-secondary mt-3'>Cancel</button>
                                    </div>
                                </form>
                            ) 
                            : 
                            ( <p className='text-muted small'>Click on the <strong>Edit</strong> Button in the table to modify a Book.</p> )}
                        </div>
                    </div>
                </div>

                <div className='col-md-8'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 className="fw-semibold mb-3">Books Listing</h6>
                                <button onClick={()=>navigate("/admin/book_add")} className='btn btn-outline-primary btn-sm'><i className='fa-solid fa-plus me-1'></i> Add New</button>
                            </div>

                            { loadingList ? (
                                <div className='text-center py-4'>
                                    <div className='spinner-border text-primary'></div>
                                </div>
                            ) : books.length === 0 ? (<p className="text-muted small">No Books found. Add your first Book.</p>)
                            : (
                                <div className="table-responsive">
                                    <table className='table table-striped table-hover align-middle'>
                                        <thead className='small text-muted'>
                                            <tr>
                                                <th>#</th>
                                                <th>Book</th>
                                                <th>Category</th>
                                                <th>Author</th>
                                                <th>ISBN</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className='text-center'>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {books.map((book,index) => (
                                                <tr key={book.id}>
                                                    <td>{index+1}</td>
                                                    <td style={{maxWidth:"200px"}}>
                                                        <img src={`http://127.0.0.1:8000${book.cover_image}`} alt={book.title} className='img-fluid rounded' style={{maxWidth:"100px", height:"70px", marginBottom:"4px"}} />
                                                        <div className='fw-bold small'>
                                                            {book.title}
                                                        </div>
                                                    </td>
                                                    <td className='small text-muted'>{book.category_name}</td>
                                                    <td className='small text-muted'>{book.author_name}</td>
                                                    <td className='small text-muted'>{book.isbn}</td>
                                                    <td className='small text-muted'>{book.price}</td>
                                                    <td className='small text-muted'>{book.quantity}</td>
                                                    <td className='text-center'>
                                                        <button onClick={()=>startEdit(book)} className='btn btn-sm btn-outline-primary me-2'><i className='fa-solid fa-pen-to-square'></i>Edit</button>
                                                        <button onClick={()=>handleDelete(book.id)} className='btn btn-sm btn-outline-danger'><i className='fa-solid fa-trash-can'></i>Delete</button>
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

export default ManageBooks
