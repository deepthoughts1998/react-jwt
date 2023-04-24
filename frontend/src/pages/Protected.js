import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected({children}) {
    
    if(localStorage.getItem("user")){
        console.log("hari wede")
        return children
    }else{
        return <Navigate to="/signin" />
    }
  
}
