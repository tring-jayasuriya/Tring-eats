const {gql}=require("apollo-server-express")

const restaurantDefs=gql`
    type Restaurant{
        id:Int
        name:String
        email:String
        city:String
        address:String
        image:String
        emailError:Boolean
        passwordError:Boolean
        isAuthenticated:Boolean
    }
    
    type Dish{
        id:Int!,
        name:String!
        price:String!
        image:String!
        restaurant_id:Int!
        restaurant_name:String!
        isavailable:Boolean
    }

    type CartResponse {
        message: String!
    }

    type Order{
        id:ID!
        user_id:Int!
        total_price:Float!
        order_status:Boolean
    }

    type MyOrderResponse{
        order_id: Int
        user_id: Int
        user_name: String
        restaurant_id: Int
        product_id: Int
        restaurant_name: String
        product_name: String
        quantity: Int
        total_price: Float
        order_status: String
    }
    
    type OrderResponse{
        order_id:ID
        message:String!
        success:Boolean
    }

    type StatusResponse{
        isopen:Boolean!
    }

    input OrderItem{
        product_id:Int!
        quantity:Int!
    }
  
    type Query{
        getRestaurant(email:String!,password:String!):Restaurant
        getDishes(page:Int!):[Dish]
        getRest(page:Int!):[Restaurant]
        getCartItems(id:Int!):[Dish]
        getMenu(id:Int!):[Dish]
        getStatus(id:Int!):StatusResponse
        orderDetails(id:Int!):[MyOrderResponse]
        searchDish(name:String!,page:Int!):[Dish]
        getOrderHistory(id:Int!):[MyOrderResponse]
    }
 

    type Mutation{
        createRestaurant(name:String!,password:String!,email:String!,city:String!,address:String!):Restaurant
        addToCart(product_id:Int!, restaurant_id:Int!, user_id:Int!):CartResponse
        deleteItem(user_id:Int!, product_id:Int!):CartResponse
        confirmOrder(user_id:Int!, total_price:Float!, orderItems:[OrderItem]!):OrderResponse
        updateRestaurantStatus(id:Int!,isopen:Boolean!):StatusResponse
        orderStatus(orderId:Int!,orderStatus:String!):String
    }
`

module.exports=restaurantDefs