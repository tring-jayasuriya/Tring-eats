import {Route, Routes,} from  "react-router-dom"
import App from "../App"
import { Login } from "../components/auth/Login"
import { Signin } from "../components/auth/Signin"
import { Home } from "../pages/Home"
import Main from "../components/Main"

import { LandingPage } from "../pages/LandingPage"
import { RestaurantSignUp } from "../restaurant/restaurantSignUp"
import { RestaurantDashboard } from "../pages/RestaurantDashboard"

import Category from "../components/Category"
import PopularRestaurant from "../components/PopularRestaurant"
import Dishes from "../components/Dishes"
import ProtectedRoute from "../components/ProtectedRoute"
import AllDish from "../components/AllDish"
import SearchDish from "../components/SearchDish"
import RestaurantProtectedRoute from "../restaurant/RestaurantProtectedRoute"

const Router=()=>{

    return(
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="" element={<LandingPage/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Signin/>}/>
                <Route path="home" element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }>
                    <Route path="" element={<Main/>}/>
                    <Route path="dishes" element={<Dishes/>} />
                    <Route path="category" element={<Category/>} />
                    <Route path="popular-restaurant" element={<PopularRestaurant/>} />
                    <Route path="restaurant-dish" element={<AllDish/>}/>
                    <Route path="search" element={<SearchDish/>} />
                </Route>
                <Route path="tring-eats" element={<LandingPage/>}/>
                <Route path="restaurant/signup" element={<RestaurantSignUp/>}/>
                <Route path="restaurant" element={
                    <RestaurantProtectedRoute>
                        <RestaurantDashboard/>
                    </RestaurantProtectedRoute>
                    }/>
            </Route>

        </Routes>
    )
}

export default Router