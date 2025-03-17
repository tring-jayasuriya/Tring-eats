

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


    const componentList={
        dashboard:Dashboard,
        orders:Foodorder,
        favourite:Favourite,
        history:OrderHistory
    }

    const CurrentComponent=componentList[componentName] 



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

    useEffect(()=>{

        const fetchLocation=async()=>{
            if(myLocation.latitude!==''){
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${myLocation.latitude}&lon=${myLocation.longitude}&format=json`);
                const data=response.json()
                console.log(data);
            }
        }

        fetchLocation()
       

    },[myLocation])


    console.log(myLocation);

  return (
    <div className=' md:w-[75%] bg-litMango p-10 pt-6 '>
        <Header/>
        <CurrentComponent/>
    </div>
  )
}

export default Main