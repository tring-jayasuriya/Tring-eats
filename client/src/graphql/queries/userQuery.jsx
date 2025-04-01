import { gql } from "@apollo/client";

export const GET_USER=gql`
    mutation UserAuthentication ($email:String!,$password : String!,$type: String!) {
        login(email: $email, password: $password,type:$type)
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

export const GET_USER_INFO=gql`
query user{
    getUserInfo{
        name
        email
        address
        id
        city
    }
}   
`