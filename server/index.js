const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")

// const {ApolloServer } = require("apollo-server-express")
// const { connectDB } = require("./db/config")
// const {typeDefs,resolvers}=require('./graphql/index')
const { postgraphile } = require("postgraphile")

dotenv.config()
const app=express()
exports.app = app

app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true
}))




// const authenticateUser = (req,res,next) => {
//     const typeHeader = req.headers.type
//     console.log(">>>>>>",typeHeader);
//     next()
    
// };


app.use(express.json())
app.use(cookieParser())

// app.use(authenticateUser)

// app.use(
//     postgraphile(process.env.DATABASE_URL, "public", {
//       watchPg: true, // Automatically update schema changes
//       graphiql: true, // Enable GraphiQL interface
//       enhanceGraphiql: true, // Better UI for GraphiQL
//       dynamicJson: true, // Return JSON fields as objects
//       enableCors: true, // Allow CORS
//     })
//   );

  
  app.listen(process.env.PORT,()=>{
    console.log(`server is running in the port ${process.env.PORT}`);
})






// const startServer=async()=>{
//     try{
//         const server=new ApolloServer({
//             typeDefs,
//             resolvers,
//             introspection: true,
//             playground: true,
//             context:({req,res})=>({req,res})
        
//         })
//         await server.start()
//         server.applyMiddleware({app,cors:false})
//         await connectDB()

//         app.listen(process.env.PORT,()=>{
//             console.log(`server is running in the port ${process.env.PORT}`);
//         })

//     }catch(err){
//         console.log("error from index.js start server");
//         console.log(err.message);
//     }
// }

// startServer()

