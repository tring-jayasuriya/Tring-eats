import React, { useState } from 'react'
import '../../css/Authcss/auth.css'

export const EmailVerificationPage = () => {
    const [code,setCode]=useState("")

    const handleOnchange=(e)=>{
        setCode(e.target.value)
    }

    console.log(code);
    

    const handleOnSubmit=()=>{

    }

  return (
    <div className='w-full h-full bg-litMango min-h-screen flex items-center justify-center'>
        
        <div className='bg-white py-8 px-4 shadow-md space-y-6 rounded-lg'>
            <p>Enter the verification code sent to your email</p>
            <input className='input-field' type='text' placeholder='Enter the 6 digit code' onChange={(e)=>handleOnchange(e)}/>
            <button className='w-full bg-mango input-field text-white' >Submit</button>
        </div>

    </div>
  )
}
