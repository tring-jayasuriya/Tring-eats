import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const data=localStorage.getItem("user")
    const navigate=useNavigate()

    useEffect(()=>{
        if(!data){
            navigate("/login")
        }
    },[])

    return children
    
}

export default ProtectedRoute