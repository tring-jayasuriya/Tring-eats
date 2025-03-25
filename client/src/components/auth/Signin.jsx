import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import {useForm} from "react-hook-form"

import '../../css/Authcss/auth.css'
import SideImage from '../../assets/auth-images/auth-side-image.png'
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutation/userMutation';
import { toast } from 'react-toastify';
import EyeButton from '../common/EyeButton';
import { ShowEyeIcon } from '../common/ShowEyeIcon';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TermsAndConditions } from './TermsAndConditions';

export const Signin = () => {

    const [policyCheck,setPolicyCheck]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const [showterms,setShowterms]=useState(false)
    const [policyError,setPolicyError]=useState(false)

    const {
        register,
        handleSubmit,
        formState:{errors},
        watch
    }=useForm()

    const navigate=useNavigate()
    const[createUser,{data,loading,error}]=useMutation(CREATE_USER,{fetchPolicy:"no-cache"})

    const handleRegistration=async(userdata)=>{

        try{

            if(!policyCheck){
                setPolicyError(true)
                return
            }

            await createUser({
                variables:{name:userdata.name,password:userdata.password,email:userdata.email}
            })

            console.log(data?.register);

            
        }catch(err){
            toast.error(err.message)
            console.log("error from handle registration",err);
        }
        
    }

    useEffect(()=>{
        if(data?.register){
            toast.success(data?.register)
            navigate("/login?tag=user")
        }

    },[data])

    const handleLogin=()=>{
        navigate("/login?tag=user")
    }

    console.log("create user log",data?.register);

    const handleTermsAndPolicy=()=>{
        setPolicyCheck((prev)=>!prev)
        console.log(policyCheck);
    }


    useEffect(()=>{

        if(policyCheck) setPolicyError(false)

    },[policyCheck])

    



  return (
        <div className='main-container'>            

            <div className='main-container-wrapper'>


                <div  className='flex justify-center items-center'>
                    <div className=' w-full p-9  md:w-[80%] md:p-5' >

                        <form className='w-full space-y-6' onSubmit={handleSubmit(handleRegistration)}>

                            <p className='text-center text-xl md:text-3xl lg:text-4xl mt-5'>Get Started Now</p>

                            <div className='space-y-2' >
                                <p className=' auth-label'>Name</p>
                                <input
                                    className='input-field'
                                    type='text'
                                    placeholder='Enter your name'
                                    {...register("name",{
                                        required:"name is empty",
                                        validate:(data)=>data.length>=3 || "username is too short"
                                    })}
                                />
                                {errors.name && <p className="error-msg">{errors.name.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <p className='auth-label'>Email address</p>
                                <input
                                    className='input-field'
                                    type='email'
                                    placeholder='Enter your email' 
                                    {...register("email",{
                                        required:"email is empty",
                                        pattern:{
                                            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message:"Invalid email"
                                        }
                                    })}
                                />
                                {errors.email && <p className="error-msg">{errors.email.message}</p>}
                            </div>

                            <div className='space-y-2 relative'>
                                <p className='auth-label'>Password</p>
                                <input
                                    className='input-field'
                                    type={ showPassword? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    {...register("password",{
                                        required:"password is empty",
                                        pattern:{
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:"password should contains uppercase,digit and symbol with minimum 8 characters"
                                        }
                                    })}
                                    />

                                    {showPassword ?  <EyeButton setShowPassword={setShowPassword} /> : <ShowEyeIcon setShowPassword={setShowPassword} />}

                                    {errors.password && <p className="error-msg">{errors.password.message}</p>}
                            </div>

                            <div className='space-y-2 relative'>
                                <p className='auth-label'>Confirm password</p>
                                <input
                                    className='input-field'
                                    type={ showConfirmPassword? 'text' : 'password'}
                                    placeholder='Enter confirm password'
                                    {...register("confirmPassword",{
                                        required:"confirm password is empty",
                                        validate:(data)=> data===watch("password") || "confirm password does not match password"
                                    })}
                                />
                                {showConfirmPassword ?  <EyeButton setShowPassword={setShowConfirmPassword} /> : <ShowEyeIcon setShowPassword={setShowConfirmPassword} />}
                                {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword.message}</p>}
                            </div>

                            <div className='flex items-center space-x-2 '>
                                
                                <div onClick={()=>handleTermsAndPolicy()} className='cursor-pointer'>
                                {policyCheck? < IoIosCheckbox/>: <MdOutlineCheckBoxOutlineBlank/>}
                                </div>

                                <p className='text-xs cursor-pointer hover:underline' onClick={()=>setShowterms(true)}>I agree to the terms and policy </p>

                                {policyError && <p className="error-msg ">You must agree to the terms and conditions</p>}

                            </div>

                            
                            <button disabled={loading} type='submit'  className='signup-btn'>{loading?  <AiOutlineLoading3Quarters className='mx-auto  animate-spin'/> :"signin"}</button>

                            <p className='footer-div'>OR</p>

                            <p className='footer-div' >already have an account? <span onClick={()=>handleLogin()} className='text-blue-500 cursor-pointer'>Sign In</span></p>

                        </form>

                    </div>

                </div>


            </div>

            <div className='hidden sm:block sm:w-1/2 sm:h-full  bg-red-400 '>
                <img  className='bg-mango w-full h-full object-contain' src={SideImage}/>
            </div>

            {showterms  && <TermsAndConditions setShowterms={setShowterms} setPolicyCheck={setPolicyCheck}/>}


        </div>
  )
}
