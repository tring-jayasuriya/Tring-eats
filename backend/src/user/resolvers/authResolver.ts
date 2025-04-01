import { setCookie } from "../../utils/setCookie"
import { getRestaurantData, getUserInfo, InsertOrderItems, login, register } from "../service/user.service"


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
                },

                createOrderItemsBulk:async(_:any,args:any,context:any)=>{
                    console.log("bulk data insert",args);


                    
                    return InsertOrderItems(args)
                }


                // addToCart:async(_:any, args:any, context:any)=>{

                //     const response= await addToCart(args)

                // }


            },

            Query : {
                getUserInfo:async(_:any,args:any,context:any)=>{
                    console.log("???????? >>> >> log from getUser info",context?.id);

                    return await getUserInfo(context.id) 
                },

                getRestaurantInfo:async(_:any,args:any,context:any)=>{
                    console.log("log from restaurant info");
                    
                    return await getRestaurantData(context.id)
                }
            }
}