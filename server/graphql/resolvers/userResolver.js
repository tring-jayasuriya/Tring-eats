const { Query } = require("pg")
const { pool } = require("../../db/config")
const generateToken = require("../../utils/generateJwtToken")
const setCookie = require("../../utils/setCookie")



const userResolver={

    Mutation:{
        createUser:async(_,{name,password,email})=>{
            try{

                const existingUser=await pool.query("SELECT * FROM users WHERE email=$1",
                    [email]
                )

                if(existingUser.rowCount>0) throw new Error("user already have an account")
                
                const res=await pool.query(
                    "INSERT INTO users(name,password,email) VALUES ($1,$2,$3) RETURNING name, email, id",
                    [name,password,email]
                )

                console.log(res.rows[0]);
                console.log("user registration successfull");
                
                return res.rows[0]
                
            }catch(err){
                console.log("error from create user resolver");
                console.log(err.message);
                throw new Error(err.message)
            }

        }

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

                console.log(token);

                setCookie(token,res)
                

                console.log(response.rows[0]);
                
                
                return {...response.rows[0],isAuthenticated:true}

            }catch(err){
                console.log("log from get user error",err);
                throw new Error(err)
                
            }
        }
    }
}

module.exports=userResolver