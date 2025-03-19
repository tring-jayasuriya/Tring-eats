import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import {useForm} from "react-hook-form"

import '../css/Authcss/auth.css'
import SideImage from '../assets/auth-images/auth-side-image.png'

import { useMutation } from '@apollo/client';
import { CREATE_RESTAURANT } from '../graphql/mutation/restaurantMutation';
import { toast } from 'react-toastify';
import EyeButton from '../components/common/EyeButton';
import { ShowEyeIcon } from '../components/common/ShowEyeIcon';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const RestaurantSignUp = () => {

    const [policyCheck,setPolicyCheck]=useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)

    const {
        register,
        handleSubmit,
        formState:{errors},
        watch
    }=useForm()

    const navigate=useNavigate()
    const[createRestaurant,{data,loading,error}]=useMutation(CREATE_RESTAURANT,{fetchPolicy:"no-cache"})

    const handleRegistration=async(Ownerdata)=>{

        console.log(Ownerdata);
        
        try{

            await createRestaurant({
                variables:{name:Ownerdata.name,password:Ownerdata.password,email:Ownerdata.email,city:Ownerdata.city,address:Ownerdata.address}
            })
            
            console.log(data?.createRestaurant);
            navigate("/login?tag=restaurant")
            
        }catch(err){
        toast.error(err.message)
            console.log("error from handle registration",err);
        }
        
    }

    const handleLogin=()=>{
        navigate('/login?tag=restaurant')
    }

    console.log(">>>>>>>",data?.createRestaurant);


  return (
        <div className='main-container'>            

            <div className='main-container-wrapper'>

                <div  className='flex justify-center items-center'>
                    <div className=' w-full p-9  md:w-[80%] md:p-5' >

                        <form className='w-full space-y-6' onSubmit={handleSubmit(handleRegistration)}>

                            <p className='text-center text-xl md:text-3xl lg:text-4xl mt-5'>Add your restaurant</p>

                            <div className='space-y-2' >
                                <p className=' auth-label'>Restaurant Name</p>
                                <input
                                    className='input-field'
                                    type='text'
                                    placeholder='Enter restaurant name'
                                    {...register("name",{
                                        required:"name is empty",
                                        validate:(data)=>data.length>=3 || "username is too short"
                                    })}
                                />
                                {errors.name && <p className="error-msg">{errors.name.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <p className='auth-label'>Location</p>
                                <input
                                    className='input-field'
                                    type='text'
                                    placeholder='Enter your city' 
                                    {...register("city",{
                                        required:"city is empty",
                                    })}
                                />
                                {errors.city && <p className="error-msg">{errors.city.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <p className='auth-label'>Restaurant address</p>
                                <input
                                    className='input-field'
                                    type='text'
                                    placeholder='Enter your address' 
                                    {...register("address",{
                                        required:"address is empty",
                                    })}
                                />
                                {errors.address && <p className="error-msg">{errors.address.message}</p>}
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
                                            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
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

                            {/* <div className='flex items-center space-x-2'>
                                
                                <div onClick={()=>setPolicyCheck((prev)=>!prev)}>
                                {policyCheck? < IoIosCheckbox/>: <MdOutlineCheckBoxOutlineBlank/>}
                                </div>

                                <p className='text-xs'>I agree to the terms and policy </p>

                            </div> */}

                            
                            <button disabled={loading} type='submit'  className='signup-btn'>{loading?  <AiOutlineLoading3Quarters className='mx-auto  animate-spin'/> :"signin"}</button>

                            <p className='footer-div'>OR</p>

                            <p className='footer-div' >already have an account? <span onClick={()=>handleLogin()}   className='text-blue-500 cursor-pointer'>Sign In</span></p>

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
