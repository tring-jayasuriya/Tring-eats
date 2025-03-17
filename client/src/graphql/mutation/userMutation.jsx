import { gql } from "@apollo/client";

export const CREATE_USER=gql`
    mutation createUser($name:String!,$password:String!,$email:String!){
        createUser(name:$name,password:$password,email:$email){
            name
            email
        }
    }   
` 

export const UPDATE_USER_DETAILS=gql`
    mutation updataUser($name:String!,$email:String!,$city:String,$address:String){
        updateUser(name:$name,email:$email,city:$city,address:$address)
    }
`