import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [coverFile, setCoverFile] = useState(null)

    const [authors,setAuthors] = useState([]); // dropdown
    const [categories, setCategories] = useState([]); // dropdown

    const [loading,setLoading] = useState(false); // loading for button
    const [loadingDropdowns, setLoadingDropdowns] = useState(false); // loading for dropdown

    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser');

    useEffect(() => {
        if(!adminUser){
            navigate('/admin/login');
        } else {
            fetchDropdownData();
        }
    }, []);

    const fetchDropdownData = async()=> {
        setLoadingDropdowns(true);
        try {
            const [catRes, authRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/categories/"),
                axios.get("http://127.0.0.1:8000/api/authors/")
            ]);
            const activeCats = (catRes.data).filter((c)=> c.is_active);
            setCategories(activeCats);
            setAuthors(authRes.data);
        }
        catch(err) {
            console.error(err);
            toast.error('Faild to load Authors or Categories')
        }
        finally {
            setLoadingDropdowns(false);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('price', price);
        formData.append('quantity', quantity);

        if(coverFile) {
            formData.append('cover_image', coverFile);
        }

        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/books/add/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (res.data.success){
                toast.success(res.data.message || "Book added successfully!")
                setTitle("");
                setCategory("");
                setAuthor("");
                setIsbn("");
                setPrice("");
                setQuantity("");
                setCoverFile(null);
                fetchDropdownData();
            }
            else {
                toast.error(res.data.message || "Failed to create Book")
            }
        }
        catch(err) {
            console.error(err);
            toast.error("Something went wrong");
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
                            <i className='fa-solid fa-book text-primary'></i> Add Book
                        </h4>
                        <p className='text-muted small'>Create new Book by filling the form below</p>
                    </div>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            { loadingDropdowns ? (
                                <div className='text-center my-5'>
                                    <span className='spinner-border text-primary'></span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} >
                                    <div className='row g-3'>
                                        <div className='col-md-6'>
                                            <label className='form-label small fw-medium'>Book Name</label>
                                            <input type="text" className='form-control' value={title || ""} onChange={(e) => setTitle(e.target.value)} placeholder='e.g. Python Programming' required />
                                        </div>

                                        <div className='col-md-6'>
                                            <label className='form-label small fw-medium'>Category</label>
                                            <select className='form-select' value={category} onChange={(e)=>setCategory(e.target.value)} required>
                                                <option value="">Select Category</option>
                                                {categories?.map((cat)=>(
                                                    <option value={cat.id} key={cat.id}> {cat.name} </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='col-md-6'>
                                            <label className='form-label small fw-medium'>Author</label>
                                            <select className='form-select' value={author} onChange={(e)=>setAuthor(e.target.value)} required>
                                                <option value="">Select Author</option>
                                                {authors?.map((author)=>(
                                                    <option value={author.id} key={author.id}> {author.name} </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='col-md-6'>
                                            <label className='form-label small fw-medium'>ISBN Number</label>
                                            <input type="text" className='form-control' value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder='Unique ISBN Number' required />
                                            <p className='small text-muted mb-0'>ISBN must be unique for each book</p>
                                        </div>

                                        <div className='col-md-4'>
                                            <label className='form-label small fw-medium'>Price</label>
                                            <input type="number" min='0' step='0.01' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='e.g. 199.99' required />
                                        </div>

                                        <div className='col-md-4'>
                                            <label className='form-label small fw-medium'>Quantity</label>
                                            <input type="number" min='0' step='1' className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='e.g. 50' required />
                                        </div>

                                        <div className='col-md-4'>
                                            <label className='form-label small fw-medium'>Cover Image</label>
                                            <input type="file" accept='image/*' className='form-control' onChange={(e) => setCoverFile(e.target.files[0])} required />
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                                            { loading ? (<> <span className='spinner-border spinner-border-sm me-2'></span> Submitting... </>)
                                            :
                                            (<> <i className='fa-solid fa-plus'></i> Add Book </>)
                                            }
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddBook
