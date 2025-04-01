import { gql } from "@apollo/client";

export const CREATE_RESTAURANT=gql`
    mutation createRestaurant($name:String!,$password:String!,$email:String!,$city:String!,$address:String!){
        createRestaurant(name:$name,password:$password,email:$email,city:$city,address:$address){
            name
            email
        }
    }   
` 

export const ADD_TO_CART = gql`
mutation user($productId: Int!, $userId: Int!) {
  createCart(input: {cart: {productId: $productId, userId: $userId}}) {
    clientMutationId
  }  
}

`;

export const DELETE_ITEM=gql`
    mutation user($id:Int!) {
        deleteCartById(input: {id: $id}) {
            clientMutationId
            deletedCartId
        }
}
`

export const CONFIRM_ORDER=gql`
    mutation user($userId: Int!) {
  createOrder(input: {order: {userId: $userId}}) {
        order {
            id
        }
    }
}

`

export const UPDATE_RESTAURANT_STATUS=gql`
    mutation restaurant($isopen: Boolean!, $id: Int!) {
    updateRestaurantById(input: {restaurantPatch: {isopen: $isopen}, id: $id}) {
        clientMutationId
    }
}


`

export const ORDER_STATUS=gql`
    mutation orderStatus($orderId:Int!, $orderStatus:String!){
        orderStatus( orderId:$orderId,orderStatus:$orderStatus)
    }
`

export const ADD_MENU=gql`
    mutation restaurant($name: String!, $price: BigFloat! , $restaurantid: Int! , $image: String ) {
  createProduct(
    input: {product: {name: $name, price: $price, restaurantid: $restaurantid, image: $image}}){
    clientMutationId  
  }
}

`

export const UPDATE_MENU=gql`
 mutation restaurant($price: BigFloat!, $name: String!, $image: String!, $id: Int!) {
    updateProductById(
        input: {productPatch: {image: $image, name: $name, price: $price}, id: $id}){
    clientMutationId  
  }
}

`

export const DELETE_MENU=gql`
    mutation restaurant($id: Int!) {
    deleteProductById(input: {id: $id}){
        clientMutationId
    }
}

`

export const IS_RESTAURANT_OPEN=gql`
    mutation isRestaurantOpen($id:Int!){
        isRestaurantOpen(id:$id){
            isopen
        }
    }
`


export const INSERT_ORDER_ITEM=gql`
    mutation user($orderItems: [BulkOrderItemInput!]!) {
        createOrderItemsBulk(orderItems: $orderItems ) 
    }
`
