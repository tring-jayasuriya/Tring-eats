import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteLocalStorage, getLocalStorage } from '../common/GetLocalStorage'
import { FiSearch } from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT } from '../../graphql/mutation/userMutation'
import { toast } from 'react-toastify'
import { GET_USER_INFO } from '../../graphql/queries/userQuery'
import { UserContext } from '../../App'

export const Header = () => {

    const navigate=useNavigate()
    const[search,setSearch]=useState("")
    const [logout, {data,loading,error}]=useMutation(LOGOUT,{fetchPolicy:"no-cache"})
    const {data:userInfo}=useQuery(GET_USER_INFO,{fetchPolicy:"no-cache"})
    const {userData,setUserData}=useContext(UserContext)

    console.log( "context data",userData);
    

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

    useEffect(()=>{

        if(userInfo?.getUserInfo){
            setUserData(userInfo?.getUserInfo)
        }

    },[userInfo])


  return (
    
    <div className='flex space-x-48 items-center justify-center mb-6 '>
        <p className='font-semibold text-2xl'>Hello, {userData?.name} </p>
        <div className='flex bg-white rounded-lg items-center pl-3'>
            <FiSearch className='text-mango' /> 
            <input onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>handleSearch(e)} className='p-3 rounded-lg text-sm outline-none' type='text' placeholder='what do you want to eat today'/>
        </div>

        <button className='logout bg-mango' onClick={()=>handleLogOut()}>Logout</button>
    </div>
    
  )
}
