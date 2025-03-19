import React from 'react'
import { IoEye } from "react-icons/io5";

export const ShowEyeIcon = ({setShowPassword}) => {

  return (
    <div className="absolute right-5 top-8 text-xl cursor-pointer" onClick={()=>setShowPassword(true)}>
        <IoEye />
    </div>
  )
}
