const { Query } = require("pg")
const { pool } = require("../../db/config")
const generateToken = require("../../utils/generateJwtToken")
const setCookie = require("../../utils/setCookie")
const generateVerificationCode = require("../../utils/generateVerificationCode")
const SendverificationEmail = require("../../Mail/mail")



const userResolver={

    Mutation:{
        createUser:async(_,{name,password,email})=>{

            try{

                console.log("<>>>>",process.env.EMAIL_ID);

                const existingUser=await pool.query("SELECT * FROM users WHERE email=$1",
                    [email]
                )

                if(existingUser.rowCount>0) throw new Error("user already have an account")
                
                const res=await pool.query(
                    "INSERT INTO users(name,password,email) VALUES ($1,$2,$3) RETURNING name, email, id",
                    [name,password,email]
                )

                // const code=generateVerificationCode()

                // const emailResponse=await SendverificationEmail(email,code)

                // console.log("mail response log");
                

                console.log(res.rows[0]);
                console.log("user registration successfull");
                
                return res.rows[0]
                
            }catch(err){
                console.log("error from create user resolver");
                console.log(err.message);
                throw new Error(err.message)
            }

        },

        updateUser:async(_,{name,email,city,address})=>{
            try{

                console.log(name , email , city,address);
                
    
                const response=await pool.query(
                    `update users set name=$1, city=$2, address=$3 where email=$4`,
                    [name,city,address,email]
                )
    
                return "profile updated successfully"
    
            }catch(err){
                console.log("error from update user resolver ",err);
                
            }
        },

    },



    Query:{
        getUser:async(_,{email,password},{res})=>{
            console.log("log from get user");
            
            try{
                const response=await pool.query(
                    "SELECT name, id,email ,password from users where email=$1",
                    [email]
                )

                

                if(response.rowCount===0)  return {emailError:true}
            
                const checkPassword=response.rows[0].password

                if(checkPassword!==password) return {passwordError:true}

                const user={
                    id:response.rows[0].id,
                    role:"user"
                }

                const token=generateToken(user)

                // const code=generateVerificationCode()

                // const emailResponse=await SendverificationEmail(email,code)

                // console.log("mail response log",emailResponse);


                setCookie(token,res)
                

                console.log(response.rows[0]);
                
                
                return {...response.rows[0],isAuthenticated:true}

            }catch(err){
                console.log("log from get user error",err);
                throw new Error(err)
                
            }
        },

        getProfileDetails: async(_,{id})=>{

            console.log(">>>>>>id",id);
            

            try{
                const response=await pool.query(
                    `select * from users where id=$1`,
                    [id]
                )

                return response.rows[0]

            }catch(err){
                
                console.log("error from get profile resolver",err);
                throw new Error(err)
                
            }
        }
    }
}

module.exports=userResolver