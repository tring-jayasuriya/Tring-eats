import { login, register } from "../service/user.service"


export const AuthResolvers={

            Mutation:{

                login: async(_ : any ,args:{email:string,password:string})=>{
                    const {email,password}=args
                    const response=await login(email,password)
                    return response
                },

                register:async(_ : any, args:{email:string, password:string, name:string})=>{
                    const {email,password,name}=args
                    const response= await register(email,password,name)
                    return response
                }
            }
}