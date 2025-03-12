import { gql } from "@apollo/client";

export const CREATE_RESTAURANT=gql`
    mutation createRestaurant($name:String!,$password:String!,$email:String!,$city:String!,$address:String!){
        createRestaurant(name:$name,password:$password,email:$email,city:$city,address:$address){
            name
            email
        }
    }   
` 

export const ADD_TO_CART=gql`
    mutation addToCart($product_id:Int!, $restaurant_id:Int!, $user_id:Int!){
        addToCart(product_id:$product_id, restaurant_id:$restaurant_id, user_id:$user_id ){
            message
        }
    }
`

export const DELETE_ITEM=gql`
    mutation deleteItem($user_id:Int!,$product_id:Int!){
        deleteItem(user_id:$user_id,product_id:$product_id){
            message 
        }
    }
`

export const CONFIRM_ORDER=gql`
    mutation confirmOrder($user_id:Int!,$total_price:Float!,$orderItems:[OrderItem]!){
        confirmOrder(user_id:$user_id,total_price:$total_price,orderItems:$orderItems){
            order_id
            success
            message
        }
    }
`

export const UPDATE_RESTAURANT_STATUS=gql`
    mutation updateRestaurantStatus($id:Int!, $isopen:Boolean!){
        updateRestaurantStatus(id:$id, isopen:$isopen){
            isopen
        }
    }
`

export const ORDER_STATUS=gql`
    mutation orderStatus($orderId:Int!, $orderStatus:String!){
        orderStatus( orderId:$orderId,orderStatus:$orderStatus)
    }
`

