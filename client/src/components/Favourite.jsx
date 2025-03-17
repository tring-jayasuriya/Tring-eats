import React, { useEffect, useState } from 'react'
import { getLocalStorage } from './common/GetLocalStorage'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROFILE_DETAILS } from '../graphql/queries/userQuery'

import { FaRegEdit } from "react-icons/fa";
import { UPDATE_USER_DETAILS } from '../graphql/mutation/userMutation';
import { toast } from 'react-toastify';

export const Favourite = () => {

  const id=getLocalStorage("user").id

  const {data,loading,error,refetch}=useQuery(GET_PROFILE_DETAILS,{fetchPolicy:"no-cache",variables:{id:id}})
  const[updateUser]=useMutation(UPDATE_USER_DETAILS,{fetchPolicy:"no-cache"})

  const [editData,setEditData]=useState(true)

  const [userData,setUserData]=useState({
    name:"",
    email:"",
    city:"",
    address:""
  })

  useEffect(()=>{

    if(data?.getProfileDetails){
      setUserData({
        name:data?.getProfileDetails.name,
        email:data?.getProfileDetails.email,
        city:data?.getProfileDetails.city,
        address:data?.getProfileDetails.address
      })
    }
  },[data])

  const handleChange=(e)=>{
    setUserData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleUpdateUser=async()=>{

    try{
      
      const {data:updateData}=await updateUser({variables:{name:userData.name,email:userData.email,city:userData.city,address:userData.address}})
      refetch()
      toast.success(updateData.updateUser)
      setEditData(true)

    }catch(err){
      console.log("error from update user",err);
    }

  }


  

  return (
    <div className='w-full h-full flex justify-center pt-10 '>
      <div className='space-y-6 bg-white h-fit py-4 px-8 rounded-lg shadow-lg relative'>
        <h1 className='font-semibold text-xl text-center'>My Profile</h1>
        <FaRegEdit className='cursor-pointer absolute -top-1 text-xl right-7' onClick={()=>setEditData(prev=>!prev)}/>

        <div className='flex justify-between items-center space-x-3'>
          <p>Name</p>
          <input type='text' disabled={editData} name='name' value={userData?.name}  className={`auth-label  p-2 w-56 ${!editData && "border-black border-2 "} border-2 rounded-lg `} onChange={(e)=>handleChange(e)}/>
        </div>

        <div className='flex justify-between items-center space-x-3'>
          <p>Email</p>
          <input disabled name='email' type='text' value={userData?.email}  className={` border-2 rounded-lg w-56 auth-label border-1 p-2`} onChange={(e)=>handleChange(e)}/>
        </div>


        <div className='flex justify-between items-center space-x-3'>
          <p>City</p>
          <input disabled={editData} name='city' type='text' value={userData?.city}  className={`auth-label  p-2 w-56  ${!editData && "border-black border-2"} border-2 rounded-lg`} onChange={(e)=>handleChange(e)}/>
        </div>

        <div className='flex justify-between items-center space-x-3'>
          <p>Address</p>
          <textarea disabled={editData} name='address' value={userData?.address} className={`auth-label border-2  p-2 w-56 rounded-lg ${!editData && "border-black border-2" }`} onChange={(e)=>handleChange(e)}/>
        </div>

        {!editData &&  <button className='w-full text-center p-2 text-white rounded-lg bg-green-500 ' onClick={()=>handleUpdateUser()}>Save Details</button>}

        

      </div>
    </div>
  )
}
