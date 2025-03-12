import React, { useEffect } from 'react'
import { getLocalStorage } from '../components/common/GetLocalStorage'
import { useNavigate } from 'react-router-dom'

const RestaurantProtectedRoute = ({children}) => {

    const navigate=useNavigate
    const name=getLocalStorage("restaurant")?.name
    console.log("log from protected routes",name);
    

    useEffect(()=>{
        if(name===undefined) navigate("/login?tag=restaurant")
    })

  return children
}

export default RestaurantProtectedRoute