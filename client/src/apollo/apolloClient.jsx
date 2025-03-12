import {ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client"

const httpLink=createHttpLink({
    uri:import.meta.env.VITE_GRAPHQL_URI,
    credentials:"include"
})


export const Client= new ApolloClient({
    link:httpLink,
    cache:new InMemoryCache()
})
