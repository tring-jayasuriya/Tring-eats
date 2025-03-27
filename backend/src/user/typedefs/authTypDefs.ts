import { gql } from "postgraphile";

export const AuthTypeDefs = gql`

    type CustomUser {
        id: Int!
        name: String!
        email:String!
        address:String
        city:String
    }

     extend type Mutation{
        login(email:String!, password: String!, type:String!) : String
        register(name:String!, email:String!, password:String!) : String
        logout:String
    }
        
    extend type Query{
        getUserInfo:CustomUser
    }
`