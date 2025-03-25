import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db/data-source";
import postgraphile from "postgraphile";
import cookieParser from "cookie-parser";
import { AuthPlugin } from "./user/plugins/authplugin";
import dotenv from  "dotenv"
import cors from "cors"
import { verifyJwtToken } from "./utils/verifyJwtToken";
// import { authenticateJWT } from "./middleware/authMiddleware";

dotenv.config()
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    watchPg: true, // Automatically update schema changes
    graphiql: true, // Enable GraphiQL interface
    enhanceGraphiql: true, // Better UI for GraphiQL
    dynamicJson: true, // Return JSON fields as objects
    // enableCors: true, // Allow CORS
    // jwtSecret: process.env.JWT_SECRET_KEY, // Ensure JWT is properly verified
    // jwtPgTypeIdentifier: "public.jwt_token", 
    appendPlugins:[AuthPlugin],
    additionalGraphQLContextFromRequest:async(req:any,res:any)=>{
      try{

        const {operationName} = req?.body || null
        console.log(">>>>>>>>>..operationsName",operationName); 
  
        if (!operationName || operationName === "IntrospectionQuery" || operationName === "UserAuthentication") return {req,res};
        
        const data=verifyJwtToken(req)

        console.log("decoded jwt data ",data);
        
        console.log("testing",typeof(operationName),typeof(data?.type) );
        console.log("testing",operationName===data?.type);
        

        if(!data || operationName!==data?.type) throw new Error("Unauthorized Access")

        return { id:data?.id, type:data?.type, req, res}

      }catch(err){
        console.log("error from additionalGraphQLContextFromRequest",err);
        throw err
      }

    },
  })
);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    app.listen(8080, () => {
      console.log(` Server running on http://localhost:8080`);
    });
  })
  .catch((error) => console.error("Database connection failed:", error));