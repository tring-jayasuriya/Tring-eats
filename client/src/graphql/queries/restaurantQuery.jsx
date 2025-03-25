import { gql } from "@apollo/client";

export const GET_RESTAURANT = gql`
  query getRestaurant($email: String!, $password: String!) {
    getData: getRestaurant(email: $email, password: $password) {
      name
      email
      id
      emailError
      passwordError
      isAuthenticated
      isopen
    }
  }
`;

export const GET_DISHES = gql`
  query user($first:Int,$offset:Int) {
  allProducts(first: $first, offset: $offset) {
    nodes {
      isavailable
      image
      id
      name
      price
      restaurantid
      restaurantByRestaurantid {
        name
      }
    }
    totalCount
  }
}

`;

export const GET_REST = gql`
 query user($first:Int,$offset: Int) {
  allRestaurants(first: $first, offset: $offset) {
    nodes {
      id
      image
      isopen
      name
    }
    totalCount
  }
}

`;

export const GET_FROM_CART = gql`
  query getCartItems($id: Int!) {
    getCartItems(id: $id) {
      name
      image
      price
      restaurant_id
      restaurant_name
      id
    }
  }
`;

export const GET_MENU = gql`
 query user($restaurantid:Int) {
    allProducts(condition: {restaurantid:$restaurantid }) {
      nodes {
        id
        image
        isavailable
        name
        price
        restaurantByRestaurantid {
          id
          name
          isopen
        }
      }
      totalCount
    }
}

`;

export const GET_STATUS = gql`
  query getStatus($id: Int!) {
    getStatus(id: $id) {
      isopen
    }
  }
`;

export const ORDER_DETAILS = gql`
  query orderDetails($id: Int!) {
    orderDetails(id: $id) {
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
`;

export const SEARCH_DISH = gql`
  query searchDish($name: String!, $page: Int!) {
    searchDish(name: $name, page: $page) {
      id
      name
      price
      restaurant_id
      restaurant_name
      image
      totalPage
    }
  }
`;

export const GET_ORDER_HISTORY = gql`
  query getOrderHistory($id: Int!,$page:Int!) {
    getOrderHistory(id: $id,page:$page) {
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
`;

export const TOTAL_PAGE = gql`
  query getTotalPage($name: String!) {
    getTotalPage(name: $name) {
      totalPage
    }
  }
`;

export const GET_RANDOM_DISH = gql`
  query user {
  allProducts(first: 6) {
      nodes {
        id
        image
        isavailable
        name
        price
        restaurantByRestaurantid {
          id
          name
          isopen
        }
      }
    }
  }
`;

// export const GET_RANDOM_RESTAURANT=gql`
//     query getRandomRestaurant($name:String!){
//         getRandomRestaurant(name:$name){
//             id
//             name
//             city
//             address
//             image
//             isopen
//         }
//     }
// `
export const GET_RANDOM_RESTAURANT=gql`
    query user {
      allRestaurants(condition: {isopen: true}, first: 6) {
        nodes {
          image
          name
          id
          address
          city
          productsByRestaurantid {
            nodes {
              image
              id
              name
              price
              restaurantid
            }
          }
        }
      }
    }
`
