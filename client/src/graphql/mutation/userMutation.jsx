import { gql } from "@apollo/client";

// export const CREATE_USER=gql`
//     mutation createUser($name:String!,$password:String!,$email:String!){
//         createUser(name:$name,password:$password,email:$email){
//             name
//             email
//         }
//     }   
// ` 


export const CREATE_USER=gql`
   mutation UserAuthentication ($email:String!,$password:String!,$name:String!){
    register(email:$email,password:$password,name:$name)
}   
` 

export const UPDATE_USER_DETAILS=gql`
mutation user($name: String, $city: String, $address: String) {
  updateUserById(
    input: {userPatch: {address: $address, city: $city, name: $name}, id: 12}
  ) {
    clientMutationId
  } 
}


`

export const LOGOUT=gql`
    mutation UserAuthentication{
        logout
    }
`