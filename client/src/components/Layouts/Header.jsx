import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteLocalStorage, getLocalStorage } from '../common/GetLocalStorage'
import { FiSearch } from 'react-icons/fi'
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../graphql/mutation/userMutation'
import { toast } from 'react-toastify'

export const Header = () => {

    const navigate=useNavigate()
    const user=getLocalStorage("user")
    const[search,setSearch]=useState("")
    const [logout, {data,loading,error}]=useMutation(LOGOUT,{fetchPolicy:"no-cache"})

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }

    const handleKeyDown=(e)=>{
        
        if(e.key==="Enter"){
            if(search.trim()==='') return
            navigate("/home/search?page=1",{state:{search:search.trim()}})
        }
    }

    const handleLogOut=async()=>{
        await logout()
        toast.success(data?.logout)
        navigate("/login")
    }


  return (
    
    <div className='flex space-x-48 items-center mb-6'>
        <p className='font-semibold text-2xl'>Hello, {user?.name} </p>
        <div className='flex bg-white rounded-lg items-center pl-3'>
            <FiSearch className='text-mango' /> 
            <input onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>handleSearch(e)} className='p-3 rounded-lg text-sm outline-none' type='text' placeholder='what do you want to eat today'/>
        </div>
        

        <button className='logout bg-mango' onClick={()=>handleLogOut()}>Logout</button>
    </div>
    
  )
}
