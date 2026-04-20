import React from 'react'

const AdminDashboard = () => {
    const adminUser = localStorage.getItem('adminUser');

  return (
    <div>
      Hello {adminUser}
    </div>
  )
}

export default AdminDashboard
