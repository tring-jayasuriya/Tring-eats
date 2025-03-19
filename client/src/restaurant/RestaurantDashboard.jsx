import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/Homecss/Home.css'
import  Overview  from '../components/Restaurant/Overview'
import RestaurantOrder from '../components/Restaurant/RestaurantOrder'
import AddMenu from '../components/Restaurant/AddMenu'
import RestaurantLogout from './RestaurantLogout'

export const RestaurantDashboard = () => {

    const navigate=useNavigate()
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const componentName=queryParams.get("type") || "dashboard"

    const componenetList={
        dashboard:Overview,
        orders:RestaurantOrder,
        addmenu:AddMenu,
        logout:RestaurantLogout
    }

    const SelectedComponent=componenetList[componentName]

    const handleComponent=(query)=>{
        navigate(`/restaurant?type=${query}`)
    }


  return (
    <div className='main-container  h-full min-h-screen flex'>

        <div className='sidebar'>
            <h1 className='font-medium text-4xl'>Tring<span className='text-green-600'>Eats</span></h1>
    
            <div className='mt-10 flex flex-col space-y-3 p-3'>
                <p onClick={()=>handleComponent("dashboard")}  className={`dashboard-items ${componentName=="dashboard" && "isActive" }`}> Dashboard </p>
                <p onClick={()=>handleComponent("orders")} className={`dashboard-items ${componentName=="orders" && "isActive" }`}> My Orders </p>
                <p onClick={()=>handleComponent("addmenu")} className={`dashboard-items ${componentName=="addmenu" && "isActive" }`}>Add Menu</p>
                <p onClick={()=>handleComponent("logout")} className={`dashboard-items ${componentName=="logout" && "isActive" }`}>Logout</p>
            </div>
        </div>
        
        <div className='conainer bg-litMango w-[75%] h-full min-h-screen'>
            <SelectedComponent className="h-full"/>
        </div>
    </div>
  )
}
