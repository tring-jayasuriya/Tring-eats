const {gql}=require("apollo-server-express")

const userDefs=gql`
    type User{
        id:Int
        name:String
        email:String
        isVerified:Boolean
        emailError:Boolean
        passwordError:Boolean
        isAuthenticated:Boolean
    }
    
    type Query{
        getUser(email:String!,password:String!):User
    }

    type Mutation{
        createUser(name:String!,password:String!,email:String!):User
    }
`

module.exports=userDefs