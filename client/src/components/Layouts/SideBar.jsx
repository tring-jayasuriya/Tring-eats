import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import '../../css/Homecss/Home.css'

const SideBar = () => {

    const navigate=useNavigate()
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const componentName=queryParams.get("type") || "dashboard"

    const handleComponent=(query)=>{
        navigate(`/home?type=${query}`)
    }

    const handleHistoryComponent=(name)=>{
      navigate(`/home?type=${name}&page=1`)
    }

  return (
    <div className='sidebar'>
        <h1 className='font-medium text-4xl'>Tring<span className='text-green-600'>Eats</span></h1>

        <div className='mt-10 flex flex-col space-y-3 p-3'>
            <p onClick={()=>handleComponent("dashboard")} className={`dashboard-items ${componentName=="dashboard" && "isActive" }`} >Dashboard</p>
            <p onClick={()=>handleComponent("orders")} className={`dashboard-items ${componentName=="orders" && "isActive" }`}>My cart</p>
            <p onClick={()=>handleHistoryComponent("history")} className={`dashboard-items ${componentName=="history" && "isActive" }`}>Order History</p>
            <p onClick={()=>handleComponent("profile")} className={`dashboard-items ${componentName=="profile" && "isActive" }`} >Profile</p>
        </div>
    </div>
    
  )
}

export default SideBar