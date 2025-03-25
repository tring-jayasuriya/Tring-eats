import { ToastContainer } from 'react-toastify'
import './App.css'
import { Outlet } from 'react-router-dom'
import { createContext, useState } from 'react'

const userContext=createContext()

function App() {

  const [userData,setUserData]=useState({})

  return (
    <div>
      <userContext.Provider value={{userData,setUserData}}>
        <ToastContainer autoClose={2000}  draggable />
        <Outlet/>
      </userContext.Provider>

    </div>
  )
}

export default App
