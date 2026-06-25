import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import adminService from '../services/adminServices'


const AdminProtectedRoute = ({children}) => {
    
    const [isAdmin, setIsAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

     useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                // We use httpOnly cookies, so no need to check localStorage
                const adminStatus = await adminService.checkAdminStatus();
                setIsAdmin(adminStatus)
            } catch (error) {
                console.error('Error checking admin status:', error)
                setIsAdmin(false)
            }finally {
                setLoading(false)
            }
        }

        checkAdminStatus();
     }, [])

if(loading){
     return (
    <div className='min-h-screen flex items-center justify-center'>
         <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-rose-200'>

         </div>
    </div>
  )
}
 if(!isAdmin) {
    return <Navigate to="/login" replace/>;
  }
  return children;
}

export default AdminProtectedRoute