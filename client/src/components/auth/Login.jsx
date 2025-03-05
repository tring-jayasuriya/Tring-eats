import React from 'react'
import {useForm} from "react-hook-form"

import SideImage from '../../assets/auth-images/auth-side-image.png'

import '../../css/Authcss/auth.css'

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";


<IoIosCheckbox /> 


export const Login = () => {

    const {
        register,
        handleSubmit,
        formState:{error},
        watch
    }=useForm()

  return (
        <div className='main-container'>            

            <div className='main-container-wrapper'>

                {/* <p className='font-semibold text-4xl mt-2 ml-5'>TRING <span className='text-ctmgreen'>EATS</span> </p> */}

                <div  className='flex justify-center items-center'>
                    <div className=' w-full p-9  md:w-[80%] md:p-5' >

                        <form className='w-full space-y-6'>

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
                            </div>

                            <div className='space-y-2'>
                                <p className='auth-label'>Password</p>
                                <input
                                    className='input-field'
                                    type='password'
                                    placeholder='Enter your password'
                                    {...register("password",{
                                        required:"password is empty",
                                        pattern:{
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:"password should contains uppercase,digit and symbol with minimum 8 characters"
                                        }
                                    })}
                                />
                            </div>

                            <div className='flex items-center justify-between text-xxs md:text-xs'>
                              <div className='flex items-center space-x-2'>
                                <span><MdOutlineCheckBoxOutlineBlank/></span>
                                <p>Remeber for 3 days </p>
                              </div>
                               <p className='text-blue-500'>Forget password</p>
                            </div>

                            
                            <button className='signup-btn'>signin</button>

                            <p className='footer-div'>OR</p>

                            <p className='footer-div' >Don't have an account? <span className='text-blue-500'>Sign Up</span></p>

                        </form>

                    </div>

                </div>



            </div>

            <div className='hidden sm:block sm:w-1/2 sm:h-full  bg-red-400 '>
                <img  className='bg-green-500 w-full h-full object-contain' src={SideImage}/>
            </div>


        </div>
  )
}
