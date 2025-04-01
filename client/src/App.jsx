import { ToastContainer } from 'react-toastify'
import './App.css'
import { Outlet } from 'react-router-dom'
import { createContext, useState } from 'react'
 
export  const UserContext=createContext()

function App() {

  const [userData,setUserData]=useState({})
  const [restaurantData,setRestaurantData]=useState({})

  return (
    <div>
      <UserContext.Provider value={{userData,setUserData,restaurantData,setRestaurantData}}>
        <ToastContainer autoClose={2000}  draggable />
        <Outlet/>
      </UserContext.Provider>
    </div>
  )
}

export default App
