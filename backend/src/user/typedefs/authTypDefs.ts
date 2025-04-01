import { gql } from "postgraphile";

export const AuthTypeDefs = gql`

    type CustomUser {
        id: Int!
        name: String!
        email:String!
        address:String
        city:String
    }

    type CustomRestuarant{
        id:Int!
        name:String!
        isopen:Boolean
    }

    input BulkOrderItemInput {
        orderId: Int!
        productId: Int!
        quantity: Int!
    }

     extend type Mutation{
        login(email:String!, password: String!, type:String!) : String
        register(name:String!, email:String!, password:String!) : String
        logout:String
        createOrderItemsBulk(orderItems: [BulkOrderItemInput!]!): String
    }
        
    extend type Query{
        getUserInfo:CustomUser
        getRestaurantInfo:CustomRestuarant
    }
`