import { setCookie } from "../../utils/setCookie"
import { login, register } from "../service/user.service"


export const AuthResolvers={

            Mutation:{

                login: async(_ : any ,args:{email:string,password:string,type:string},context:any)=>{
                    const {res}=context
                    const {email,password,type}=args
                    const response=await login(email,password,type)
                    setCookie(res,response)
                    return "login successfull"
                },

                register:async(_ : any, args:{email:string, password:string, name:string})=>{
                    const {email,password,name}=args
                    const response= await register(email,password,name)
                    return response
                },

                logout:async(_:any,args:any,context:any)=>{
                    const {res}=context
                    await res.clearCookie("jwttoken", { path: "/", httpOnly: true, sameSite: "Lax" });
                    return "logout successfull"
                }
            }
}