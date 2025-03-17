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

export const GET_PROFILE_DETAILS=gql`
    query getProfileDetails($id:Int!){
        getProfileDetails(id:$id){
            name
            email
            address
            city
        }
    }
`