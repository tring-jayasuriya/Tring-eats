import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'

import '../../css/global.css'

import { Dashboard } from './Dashboard';
import Foodorder from './Foodorder';
import { Profile} from './Profile';
import OrderHistory from './OrderHistory';
import { Header } from '../Layouts/Header';

const Main = () => {

    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const componentName=queryParams.get("type") || "dashboard"
    const [myLocation,setMylocation]=useState({
        latitude:"",
        longitude:""

    })

    const componentList={
        dashboard:Dashboard,
        orders:Foodorder,
        profile:Profile,
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


  return (
    <div className=' md:w-[75%] bg-litMango h-screen overflow-y-scroll p-10 pt-6 '>
        <Header/>
        <CurrentComponent/>
    </div>
  )
}

export default Main