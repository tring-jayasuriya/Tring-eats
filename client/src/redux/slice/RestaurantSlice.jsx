import { createSlice } from "@reduxjs/toolkit";

const  initialState={
    id:null,
    name:"",
    isopen:false
}


const RestaurantSlice=createSlice({
    name: "restaurantData",
    initialState,
    reducers:{
        setRestaurantData:(state,action)=>{
            return{
                ...state,
                ...action.payload
            }
        },

        toggleOpenStatus:(state,action)=>{
            state.isopen= !state.isopen;
        }
    }
})

export default RestaurantSlice.reducer
export const {setRestaurantData, toggleOpenStatus}=RestaurantSlice.actions