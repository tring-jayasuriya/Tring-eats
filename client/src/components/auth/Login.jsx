import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {useLocation, useNavigate} from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import SideImage from '../../assets/auth-images/auth-side-image.png'

import '../../css/Authcss/auth.css'

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/queries/userQuery';
import { GET_RESTAURANT } from '../../graphql/queries/restaurantQuery'
import { toast } from 'react-toastify'
import EyeButton from '../EyeButton'
import { ShowEyeIcon } from '../ShowEyeIcon'


export const Login = () => {

    const [policyCheck,setPolicyCheck]=useState(false)
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const componentName=queryParams.get("tag") || "user" 

    const [passwordError,setPasswordError]=useState(false)
    const [emailError,setEmailError]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    
    const navigate=useNavigate()

    const currentData={
        restaurant:GET_RESTAURANT,
        user:GET_USER
    }
    const path=currentData[componentName] ??  GET_USER

    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm()
    
    const [getData,{data,loading,error}]=useLazyQuery(path,{fetchPolicy:"no-cache"})


    const handleSignUp=()=>{
        componentName=="user"? navigate("/register") : navigate("/restaurant/signup") 
    }

    const handleLogin=async(userdata)=>{
        
        try{
            console.log(userdata);

            await getData({
                variables:{email:userdata.email,password:userdata.password}
            })

            console.log("log from handle login");

        }catch(err){
            console.log("error from handle login");
            toast.error(err.message)
            console.log(err);
        }
    }

    useEffect(()=>{

        if(data?.getData?.emailError){
            setPasswordError(false)
            setEmailError(true)
        }

        if(data?.getData?.passwordError){
            setEmailError(false)
            setPasswordError(true)
        }
        
        if(data?.getData?.isAuthenticated){
            setEmailError(false)
            setPasswordError(false)
            const localData={
                email:data.getData.email,
                id:data.getData.id,
                name:data.getData.name
            }
            localStorage.setItem(componentName,JSON.stringify(localData))
            toast.success(`welcome back ${localData.name}`)
            componentName==="user"? navigate("/home?type=dashboard") : navigate("/restaurant")
        }

    },[data])

  return (
        <div className='main-container'>            

            <div className='main-container-wrapper'>

                {/* <p className='font-semibold text-4xl mt-2 ml-5'>TRING <span className='text-ctmgreen'>EATS</span> </p> */}

                <div  className='flex justify-center items-center'>
                    <div className=' w-full p-9  md:w-[80%] md:p-5' >

                        <form className='w-full space-y-6' onSubmit={handleSubmit(handleLogin)}>

                            <p className='text-center text-xl md:text-3xl lg:text-4xl mt-5'>Welcome back</p>
                            <p className='font-normal text-center text-xs sm:text-sm'>Your favorite food, just a click away!</p>

                            <div className='space-y-2'>
                                <p className='auth-label'>Email address</p>
                                <input
                                    className='input-field'
                                    type='email'
                                    placeholder='Enter your email' 
                                    {...register("email",{
                                        required:"email is empty",
                                        pattern:{
                                            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                                            message:"Invalid email"
                                        }
                                    })}
                                />
                                {errors.email && <p className="error-msg">{errors.email.message}</p> || 
                                    emailError && <p className="error-msg">Email not found</p>
                                }
                            </div>

                            <div className='space-y-2 relative'>
                                <p className='auth-label'>Password</p>
                                <input
                                    className='input-field'
                                    type={ showPassword? 'text' : 'password'} 
                                    placeholder='Enter your password'
                                    {...register("password",{
                                        required:"password is empty",
                                    })}
                                />

                                {showPassword ?  <EyeButton setShowPassword={setShowPassword} /> : <ShowEyeIcon setShowPassword={setShowPassword} />}

                                
                                {errors.password && <p className="error-msg">{errors.password.message}</p> ||
                                 passwordError && <p className="error-msg">Incorrect password</p> }
                            </div>

                            {/* <div className='flex items-center space-x-2'>
                                                            
                                <div onClick={()=>setPolicyCheck((prev)=>!prev)}>
                                {policyCheck? < IoIosCheckbox/>: <MdOutlineCheckBoxOutlineBlank/>}
                                </div>

                                <p className='text-xs'>Remeber for 3 days </p>

                            </div> */}

                            
                            <button disabled={loading} className='signup-btn ' type='submit'>{loading?  <AiOutlineLoading3Quarters className='mx-auto  animate-spin'/> :"signin"}</button>

                            <p className='footer-div'>OR</p>

                            <p className='footer-div' >Don't have an account? <span onClick={()=>handleSignUp()} className='text-blue-500 cursor-pointer'>Sign Up</span></p>

                        </form>

                    </div>

                </div>



            </div>

            <div className='hidden sm:block sm:w-1/2 sm:h-full  bg-red-400 '>
                <img  className='bg-mango w-full h-full object-contain' src={SideImage}/>
            </div>


        </div>
  )
}
