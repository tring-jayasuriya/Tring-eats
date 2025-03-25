export const getCustomerContext = () => {
    return {
      headers: {
        Role: "customer"
      }
    }
  };

  
  export const getRestaurantContext = () => {
    return {
      headers: {
        Role: "restaurant",
      }
    }
  };