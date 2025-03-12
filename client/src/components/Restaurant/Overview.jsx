import React, { useEffect, useState } from 'react'
import '../../css/global.css'
import { getLocalStorage } from '../common/GetLocalStorage'
import { useMutation, useQuery } from '@apollo/client'
import { GET_MENU, GET_STATUS } from '../../graphql/queries/restaurantQuery'
import { UPDATE_RESTAURANT_STATUS } from '../../graphql/mutation/restaurantMutation'

const Overview = () => {

  const restaurantInfo=getLocalStorage("restaurant")
  const restaurantName=restaurantInfo?.name
  const restaurantId=restaurantInfo?.id

  const [restaurantStatus,setRestaurantStatus]=useState(false)

  const {data,loading,error}=useQuery(GET_MENU,{fetchPolicy:"no-cache", variables:{id:restaurantId}})
  const {data:status}=useQuery(GET_STATUS,{fetchPolicy:"no-cache",variables:{id:restaurantId}})
  const [updateRestaurantStatus]=useMutation(UPDATE_RESTAURANT_STATUS,{fetchPolicy:"no-cache"})

  console.log(">>>>> menu",data?.getMenu);

  useEffect(()=>{
    if(status?.getStatus){
      setRestaurantStatus(status.getStatus.isopen)
    }
  },[status])
  

  const handleRestaurantStatus=async()=>{
      console.log("before",restaurantStatus);
      const currStatus=!restaurantStatus
      
      setRestaurantStatus((prev)=>!prev)
      const {data:updateStatus}= await updateRestaurantStatus({variables:{id:restaurantId,isopen:currStatus}})

      console.log(">>>>>...........",updateStatus?.updateRestaurantStatus.isopen);
      
  }
  console.log("after",restaurantStatus);
  

  return (
    <div className=' w-full min-h-screen h-full p-6 space-y-5'>
        <p className='text-3xl text-center font-semibold'>Restaurant Dashboard</p>

        <div className='flex bg-white w-full p-2 rounded-lg justify-between items-center'>

              <p>{restaurantName}</p>

            <div className='flex gap-x-5 w-fit'>
              <p>Restaurant Status</p>
              <button onClick={()=>handleRestaurantStatus()} className={`${restaurantStatus?"bg-green-500" :"bg-red-500"}  w-full rounded-lg text-white`}>{restaurantStatus? "open" : "closed"}</button>
            </div>
        </div>

        <p className='text-xl'>Menu</p>


        <div className='grid grid-cols-2 w-full  gap-x-4 gap-y-4'>

          { 

            data?.getMenu.length>0 &&
            
            data.getMenu.map((Data,index)=>(
              
              <div className='big-card'>

                <img className='w-[30%] h-[65%] rounded-md'  src={Data.image} />

                <div className='flex flex-col justify-center items-center gap-y-2'>
                  <p className='text-base'>{Data.name}</p>
                  <p className='price text-base'>${Data.price}</p>
                </div>

                <div className='flex flex-col gap-y-3 min-w-28 pr-4 justify-center items-center'>
                </div>              
              
            </div>

            ))
          }


        </div>


    </div>
  )
}

export default Overview