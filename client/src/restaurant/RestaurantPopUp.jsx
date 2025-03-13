import React from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteLocalStorage } from '../components/common/GetLocalStorage'
import { useMutation } from '@apollo/client'
import { DELETE_MENU } from '../graphql/mutation/restaurantMutation'
import { toast } from 'react-toastify'

export const RestaurantPopUp = ({message,flag, id, editPopup,handleConfirmDelete}) => {

    const navigate=useNavigate()
    const [deleteMenu]=useMutation(DELETE_MENU,{fetchPolicy:"no-cache"})

    const data={
        action: flag==="delete"? "Delete" : "Logout"
    }

    const handleCancelButton=()=>{
        flag==="delete"? editPopup?.(false) :  navigate("/restaurant?type=dashboard")
    }

    const handleActionButton=()=>{

        flag==="delete" ? handleDelete() :  handleLogout()

    }

    const handleLogout=()=>{

        deleteLocalStorage("restaurant")
        toast.success("logout successfull")
        navigate("/login?tag=restaurant")

    }

    const handleDelete=()=>{

        handleConfirmDelete(id)

    }

  return (
    <div className='fixed flex inset-0 justify-center  bg-blackop  z-100'>

        <div className='bg-white p-4 space-y-3 rounded-lg h-36 flex flex-col justify-center mt-40'>
            <p>{message}</p>
            <div className='flex justify-center space-x-3 text-white'>
                <button onClick={()=>handleCancelButton()} className='bg-gray-400 logout'>cancel</button>
                <button onClick={()=>handleActionButton()} className='bg-red-500 logout'>{data.action}</button>
            </div>
        </div>

    </div>
  )
}
