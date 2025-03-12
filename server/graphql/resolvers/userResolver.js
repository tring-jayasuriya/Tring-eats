const { Query } = require("pg")
const { pool } = require("../../db/config")



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
        getUser:async(_,{email,password})=>{
            console.log("log from get user");
            
            try{
                const res=await pool.query(
                    "SELECT name, id,email ,password from users where email=$1",
                    [email]
                )
                

                if(res.rowCount===0)  return {emailError:true}
            
                const checkPassword=res.rows[0].password

                if(checkPassword!==password) return {passwordError:true}
                
                return {...res.rows[0],isAuthenticated:true}

            }catch(err){
                console.log("log from get user error",err);
                throw new Error(err)
                
            }
        }
    }
}

module.exports=userResolver