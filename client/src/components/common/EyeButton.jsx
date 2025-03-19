import React from "react";
import { IoMdEyeOff } from "react-icons/io";

const EyeButton = ({setShowPassword}) => {

  return (
    <div className="absolute right-5 top-8 text-lg cursor-pointer" onClick={()=>setShowPassword(false)}>
      <IoMdEyeOff  />
    </div>
  );
};

export default EyeButton;
