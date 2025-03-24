import { gql } from "postgraphile";


export const AuthTypeDefs = gql`
     extend type Mutation{
        login(email:String!, password: String!) : String
        register(name:String!, email:String!, password:String!) : String
    } 
`