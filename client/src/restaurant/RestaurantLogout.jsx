import React from 'react'
import '../css/global.css'
import { useNavigate } from 'react-router-dom'
import { deleteLocalStorage } from '../components/common/GetLocalStorage'
import { toast } from 'react-toastify'

const RestaurantLogout = () => {
    const navigate=useNavigate()

    const handleButton=(name)=>{

        if(name==="cancel") navigate("/restaurant?type=dashboard")

        else{
            deleteLocalStorage("restaurant")
            toast.success("logout successfull")
            navigate("/login?tag=restaurant")
        } 

    }

  return (
    <div className='fixed flex inset-0 justify-center  bg-blackop  z-100'>
        <div className='bg-white p-4 space-y-3 rounded-lg h-36 flex flex-col justify-center mt-40'>
            <p>Are you sure want to logout</p>
            <div className='flex justify-center space-x-3 text-white'>
                <button onClick={()=>handleButton("cancel")} className='bg-gray-400 logout'>cancel</button>
                <button onClick={()=>handleButton("logout")} className='bg-red-400 logout'>Logout</button>
            </div>

        </div>

    </div>
  )
}

export default RestaurantLogout