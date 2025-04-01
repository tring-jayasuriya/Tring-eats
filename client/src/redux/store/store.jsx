import { configureStore } from "@reduxjs/toolkit";
import RestaurantSlice from "../slice/RestaurantSlice"


export const store=configureStore({
    reducer:{
        restaurant:RestaurantSlice  
    }
})