import jwt from "jsonwebtoken"
import { Request } from "express"

export const verifyJwtToken=(req:Request):{id:number,type: string} | null =>{
    const token=req?.cookies?.jwttoken

    if(!token) {
        console.log("comes into undefined token");
        return null
    }
    
    console.log("token >>>>>>>>>>>>>>>>>>>>",token);
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY || "jwt_jsuriya_secret_key") as {id:number,type: string}
    return decoded
} 

