

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteLocalStorage, getLocalStorage } from './common/GetLocalStorage'
import { FiSearch } from 'react-icons/fi'
import { IoSearch } from "react-icons/io5";

export const Header = () => {

    const navigate=useNavigate()
    const user=getLocalStorage("user")
    const[search,setSearch]=useState("")

    const handleSearch=(e)=>{
        console.log(e.target.value);
        setSearch(e.target.value)
    }

    const handleKeyDown=(e)=>{
        
        
        
        if(e.key==="Enter"){
            if(search.trim()==='') return
            navigate("/home/search?page=1",{state:{search:search.trim()}})
        }
    }

    const handleSubmit=()=>{
        navigate("/home/search?page=1",{state:{search:search}})
    }

       const handleLogOut=()=>{
        deleteLocalStorage("user")
        navigate("/login")
    }


  return (
    
    <div className='flex space-x-48 items-center mb-6'>
        <p className='font-semibold text-2xl'>Hello, {user?.name} </p>
        <div className='flex bg-white rounded-lg items-center pl-3'>
            <FiSearch className='text-mango' /> 
            <input onKeyDown={(e)=>handleKeyDown(e)} onChange={(e)=>handleSearch(e)} className='p-3 rounded-lg text-sm outline-none' type='text' placeholder='what do you want to eat today'/>
            {/* <IoSearch className='bg-mango text-white h-full w-10  rounded-r-lg cursor-pointer' onClick={()=>handleSubmit()}/> */}
        </div>
        

        <button className='logout bg-mango' onClick={()=>handleLogOut()}>Logout</button>
    </div>
    
  )
}
