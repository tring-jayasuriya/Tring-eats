import { gql } from "@apollo/client";


export const GET_USER=gql`
    query getUser($email:String!,$password:String!){
        getData:getUser(email:$email,password:$password){
            name
            email
            id
            emailError
            passwordError
            isAuthenticated
        }
    }
`