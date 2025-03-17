const {gql}=require("apollo-server-express")

const userDefs=gql`
    type User{
        id:Int
        name:String
        email:String
        address:String
        city:String
        isVerified:Boolean
        emailError:Boolean
        passwordError:Boolean
        isAuthenticated:Boolean
    }
    
    type Query{
        getUser(email:String!,password:String!):User
        getProfileDetails(id:Int!): User

    }

    type Mutation{
        createUser(name:String!,password:String!,email:String!):User
        updateUser(name:String!,email:String!,city:String,address:String):String
    }
`

module.exports=userDefs