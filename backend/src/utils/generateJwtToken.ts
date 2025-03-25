import jwt from "jsonwebtoken"

interface User{
    type:string,
    id:number
}

export const generateToken=(user:User) : string =>{

    console.log("secret key", process.env.JWT_SECRET_KEY);
    
    const token=jwt.sign({type:user.type,id:user.id},"jwt_jsuriya_secret_key",{
        expiresIn:'3d'
    })

    return token
}
