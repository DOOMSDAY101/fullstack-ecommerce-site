import React, { useContext } from 'react'


import { Navigate, Outlet } from 'react-router-dom'
import { isUserLoggedIn } from './App'

function ProtectedRoutes() {
    const [isLoggedIn] = useContext(isUserLoggedIn);



    return (
        isLoggedIn ? <Navigate to='/' /> : <Outlet />
    )
}

export default ProtectedRoutes
