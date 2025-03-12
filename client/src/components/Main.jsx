

import React, { useEffect, useState } from 'react'
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { Dashboard } from './Dashboard';
import Foodorder from './Foodorder';
import { Favourite } from './Favourite';
import OrderHistory from './OrderHistory';
import { deleteLocalStorage, getLocalStorage } from './common/GetLocalStorage';

import '../css/global.css'
import { Header } from './Header';

const Main = () => {

    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const componentName=queryParams.get("type") || "dashboard"
    const [myLocation,setMylocation]=useState({
        latitude:"",
        longitude:""

    })
    const[search,setSearch]=useState("")

    const navigate=useNavigate()

    const user=getLocalStorage("user")


    const componentList={
        dashboard:Dashboard,
        orders:Foodorder,
        favourite:Favourite,
        history:OrderHistory
    }

    const CurrentComponent=componentList[componentName] 

    const handleLogOut=()=>{
        deleteLocalStorage("user")
        navigate("/login")
    }

    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setMylocation({
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                    })
                }
            )
        }
    },[])

    const handleSearch=(e)=>{
        console.log(e.target.value);
        setSearch(e.target.value)
    }

    const handleKeyDown=(e)=>{
        if(e.key==="Enter"){
            navigate("/home/search?page=1",{state:{search:search}})
        }
    }

    console.log(myLocation);

  return (
    <div className='w-[75%] bg-litMango p-10 pt-6 '>
        <Header/>
        <CurrentComponent/>
    </div>
  )
}

export default Main