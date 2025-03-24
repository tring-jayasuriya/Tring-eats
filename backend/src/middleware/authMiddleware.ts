// import { Request,Response,NextFunction } from "express";
// import jwt from  'jsonwebtoken'

// export const authenticateJWT=(req:Request,res:Response,next:NextFunction)=>{
//     const authHeader=req.headers.authorization

//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         req.user=null
//         return next()
//     }

//     const token=authHeader.split(" ")[1]

//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY || "jwt_jsuriya_secret_key") as {id:number,role: string}
//         req.user=decoded
//     }catch(err){
//         console.log("error from auth middleware ",err);
//         req.user=null        
//     }

//     next()
    
// }