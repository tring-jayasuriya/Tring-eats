const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")

const {ApolloServer } = require("apollo-server-express")
const { connectDB } = require("./db/config")
const {typeDefs,resolvers}=require('./graphql/index')

dotenv.config()
const app=express()

app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true
}))


app.use(express.json())
app.use(cookieParser())

const startServer=async()=>{
    try{
        const server=new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            playground: true,
            context:({req,res})=>({req,res})
        
        })
        await server.start()
        server.applyMiddleware({app,cors:false})
        await connectDB()

        app.listen(process.env.PORT,()=>{
            console.log(`server is running in the port ${process.env.PORT}`);
        })

    }catch(err){
        console.log("error from index.js start server");
        console.log(err.message);
    }
}

startServer()
