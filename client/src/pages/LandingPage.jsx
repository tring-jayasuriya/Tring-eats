import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/global.css'

export const LandingPage = () => {
    const navigate=useNavigate()

    const handleRegistration=()=>{
        navigate("/restaurant/signup")
    }

    const handleSignin=()=>{
        navigate(`/login?tag=user`)

    }

    const handleSignUp=()=>{
        navigate('/register')
    }

  return (

    <div>
        
        <div className='flex justify-between items-center pl-6'>
        
            <p className='text-2xl font-semibold tracking-wide'>Tring<span className='text-green-500'>Eats</span></p>

            <div className='flex justify-end p-4 pr-8'>
                <div className='nav-bar flex space-x-12'>
                    <button>Home</button>
                    <button>About us</button>
                    <button onClick={()=>handleRegistration()}>Restaurant Insiders </button>
                    <button onClick={()=>handleSignin()} >Sign In</button>
                    <button onClick={()=>handleSignUp()}>Sign Up</button>
                </div>

            </div>

        </div>

      


        
        <div className='w-full h-[calc(100vh-56px)] cover-image bg-cover bg-no-repeat bg-center' >
            <div className='space-y-3 w-full h-full flex justify-center items-center flex-col'>
                <p className='cover-title'>Best food for </p>
                <p className='cover-title'>your taste</p>
                <p className='pt-4'>Discover detachable cuisine and unforgettable moments </p>
                <p>in our welcoming , culinary haven </p>
                <div className='space-x-4 pt-4 '>
                    <button onClick={()=>handleSignUp()} className='cover-btn selected-btn'>Sign Up</button>
                    <button onClick={()=>handleSignin()} className='cover-btn not-btn'>Sign In</button>
                </div>

            </div>

        </div>

    </div>

  )
}
