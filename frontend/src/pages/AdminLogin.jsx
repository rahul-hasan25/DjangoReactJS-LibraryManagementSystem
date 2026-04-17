import React from 'react'

const AdminLogin = () => {
  return (
    <div className="py-5" style={{background:'linear-gradient(135deg, #f3f4ff, #fdfbff)', minHeight:'100vh'}}>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <div className='mb-4 text-center'>
                        <h4 className='fw-semibold mb-1'>
                            <i className='fa-solid fa-shield-halved text-primary'></i> Admin Sign In
                        </h4>
                        <p className='text-muted small'>Use the Admin account created via <code>createsuperuser</code></p>
                    </div>

                    <div className='card border-0 shadow-sm rounded-4'>
                        <div className='card-body p-4'>
                            <form action="">
                                <div className='mb-3'>
                                    <label className='form-label small fw-medium'>Username</label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-transparent'>
                                            <i className='fa-regular fa-user'></i>
                                        </span>
                                        <input type="text" className='form-control' placeholder='Enter Admin Username' required />
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label small fw-medium'>Password</label>
                                    <div className='input-group'>
                                        <span className='input-group-text bg-transparent'>
                                            <i className='fa-solid fa-key'></i>
                                        </span>
                                        <input type="password" className='form-control' placeholder='Enter Admin Password' required />
                                    </div>
                                </div>

                                <button type='submit' className='btn btn-primary w-100'><i className='fa-solid fa-right-to-bracket'></i> Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin