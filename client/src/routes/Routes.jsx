import {Route, Routes} from  "react-router-dom"
import App from "../App"
import { Login } from "../components/auth/Login"
import { Signin } from "../components/auth/Signin"
import { Home } from "../pages/Home"
import Main from "../components/user/Main"

import { LandingPage } from "../pages/LandingPage"
import { RestaurantSignUp } from "../restaurant/restaurantSignUp"
import { RestaurantDashboard } from "../restaurant/RestaurantDashboard"

import Category from "../components/user/Category"
import PopularRestaurant from "../components/user/PopularRestaurant"
import Dishes from "../components/user/Dishes"
import ProtectedRoute from "./ProtectedRoute"
import AllDish from "../components/user/AllDish"
import SearchDish from "../components/user/SearchDish"
import RestaurantProtectedRoute from "../restaurant/RestaurantProtectedRoute"
import { EmailVerificationPage } from "../components/Mail/EmailVerificationPage"
import PageNotFound from "../pages/PageNotFound"

const Router=()=>{

    return(
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="" element={<LandingPage/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Signin/>}/>
                <Route path="email-verification" element={<EmailVerificationPage/>}/>
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
                <Route path="restaurant/signup" element={
                        <RestaurantSignUp/>
                    }/>
                <Route path="restaurant" element={
                        <RestaurantDashboard/>
                    }/>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>

        </Routes>
    )
}

export default Router