import { Navigate } from "react-router-dom";

import React from 'react'

const AdminProtectedRoute = ({children}) => {
    // In this lesson, we check for admin status from localStorage
    // In lesson 7, we will use authentication service

    const isAdmin = JSON.parse(localStorage.getItem('adminUser')) || false

    return isAdmin ? children : <Navigate to='/login'/>
  return (
    <div>

    </div>
  )
}

export default AdminProtectedRoute