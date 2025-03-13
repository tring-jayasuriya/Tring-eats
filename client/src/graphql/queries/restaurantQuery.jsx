import { gql } from "@apollo/client";


export const GET_RESTAURANT=gql`
    query getRestaurant($email:String!,$password:String!){
        getData:getRestaurant(email:$email,password:$password){
            name
            email
            id
            emailError
            passwordError
            isAuthenticated
        }
    }
`

export const GET_DISHES = gql`
  query getDishes($page: Int!) {
    getDishes(page: $page) {
      id
      name
      image
      price
      restaurant_id
      restaurant_name
    }
  }
`

export const GET_REST = gql`
  query getRest($page: Int!) {
    getRest(page: $page) {
      name
      image
      city
      id
    }
  }
`


export const GET_FROM_CART=gql`
    query getCartItems($id:Int!){
        getCartItems(id:$id){
            name
            image
            price
            restaurant_id
            restaurant_name
            id
        }
    
    }
`

export const GET_MENU=gql`
    query getMenu($id:Int!){
        getMenu(id:$id){
            name
            price
            id
            image
            restaurant_id
        }
    }
`

export const GET_STATUS=gql`
    query getStatus($id:Int!){
        getStatus(id:$id){
            isopen
        }
    }
`


export const ORDER_DETAILS=gql`
    query orderDetails($id:Int!){
        orderDetails(id:$id){
            order_id
            product_name
            user_name
            user_id
            order_status
            product_id
            total_price
            quantity
            payment_status
            address
        }
    }
`


export const SEARCH_DISH=gql`
    query searchDish($name:String!,$page:Int!){
        searchDish(name:$name,page:$page){
            id
            name
            price
            restaurant_id
            restaurant_name
            image
        }
    }
`


export const GET_ORDER_HISTORY=gql`
    query getOrderHistory($id:Int!){
        getOrderHistory(id:$id){
            order_id
            product_name
            user_name
            user_id
            order_status
            product_id
            total_price
            quantity
            restaurant_id
            restaurant_name
            payment_status
        }
    }
`

export const TOTAL_PAGE=gql`
    query getTotalPage($name:String){
         getTotalPage(name:$name){
            totalPage
        }
    }
` 

