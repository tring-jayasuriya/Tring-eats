import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db/data-source";
import postgraphile from "postgraphile";
import cookieParser from "cookie-parser";
import { AuthPlugin } from "./user/plugins/authplugin";
import dotenv from  "dotenv"
import cors from "cors"
// import { authenticateJWT } from "./middleware/authMiddleware";

dotenv.config()
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(cookieParser());
app.use(express.json());
// app.use(authenticateJWT)

const PORT = process.env.PORT || 5000;

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    watchPg: true, // Automatically update schema changes
    graphiql: true, // Enable GraphiQL interface
    enhanceGraphiql: true, // Better UI for GraphiQL
    dynamicJson: true, // Return JSON fields as objects
    // enableCors: true, // Allow CORS
    appendPlugins:[AuthPlugin],
    additionalGraphQLContextFromRequest:async(req:any)=>{
      const body = req.body;
      console.log(body);
      
  
      // Get the operation name from the request (GraphQL Query name)
      const operationName = body?.operationName;
      console.log("operationsName",operationName)
    
      // Allow GraphiQL introspection queries to run without authentication
      if (operationName === "IntrospectionQuery") {
        return { "role": "anonymous" };
      }
    
      // If no user is logged in and the query isn't introspection, block access
     
    
      return {
        "role": "user",
      };
    },
    // pgSettings:async(req)=> ({
    //   "role" : req.user? req.user.role : "anonymous",
    //   ...(req.user ? { "user.id": req.user.id.toString() } : {})
    // }),
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