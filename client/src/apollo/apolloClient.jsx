import {ApolloClient,createHttpLink,InMemoryCache,from } from "@apollo/client"
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";


const httpLink=createHttpLink({
    uri:import.meta.env.VITE_GRAPHQL_URI,
    credentials:"include"
})

const errorLink = onError(({ graphQLErrors, networkError }) => {

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(">>>>>>>>>> from apollo" ,err);
        
        if (err.message.includes("Unauthorized Access")) {
            // toast.error("Unauthorized! Redirecting to login...")
          console.error("Unauthorized! Redirecting to login...");
          window.location.href = "/login";
        }
      }
    }
    
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });


export const Client= new ApolloClient({
    link:from([errorLink,httpLink]),
    cache:new InMemoryCache()
})
