import React, { useContext, useEffect, useState } from 'react'
import '../../css/global.css'
import { getLocalStorage } from '../common/GetLocalStorage'
import { useMutation, useQuery } from '@apollo/client'
import { GET_MENU, GET_RESTAURANT_INFO, GET_STATUS, RESTAURANT_MENU } from '../../graphql/queries/restaurantQuery'
import { UPDATE_RESTAURANT_STATUS } from '../../graphql/mutation/restaurantMutation'
import { FaRegEdit } from "react-icons/fa";
import { EditMenu } from './EditMenu'
import CommonImage from '../../assets/dishes/common-image.jpg'
import { GET_USER_INFO } from '../../graphql/queries/userQuery'
import {useDispatch,useSelector} from 'react-redux'
import { setRestaurantData } from '../../redux/slice/RestaurantSlice'
import { UserContext } from '../../App'


const Overview = () => {

  const {restaurantData,setRestaurantData}=useContext(UserContext)

  const [restaurantStatus,setRestaurantStatus]=useState(false)
  const [editPopUp,setEditPopUp]=useState(false)
  const [editItems,setEditItems]=useState(null)

  const {data,loading,error}=useQuery(GET_RESTAURANT_INFO)

  useEffect(() => {
    if (data?.getRestaurantInfo) {
      setRestaurantData(data?.getRestaurantInfo)
    }
  }, [data?.getRestaurantInfo]);
  

  console.log("context data",restaurantData);
  


  const {data:restMenu}=useQuery(RESTAURANT_MENU,{
    fetchPolicy:"no-cache",
    variables:{restaurantid:restaurantData.id},
    skip:!restaurantData?.id})
  // const {data:status}=useQuery(GET_STATUS,{fetchPolicy:"no-cache",variables:{id:restaurantId}})
  const [updateRestaurantStatus]=useMutation(UPDATE_RESTAURANT_STATUS,{fetchPolicy:"no-cache"})

  // useEffect(()=>{
  //   console.log(">>>>> menu",data?.getMenu);
  // },[data])

  console.log(" restaurant menu" ,restMenu?.allProducts );
  

  

  useEffect(()=>{
    if(restaurantData){
      setRestaurantStatus(restaurantData?.isopen)
    }
  },[restaurantData])

  console.log(restaurantStatus,"restaurantStatus");
  

  console.log("open  status",restaurantData?.isopen);
  




  const handleRestaurantStatus=async()=>{
      console.log("before",restaurantStatus);
      const currStatus=!restaurantStatus
      
      setRestaurantStatus((prev)=>!prev)
      
      const {data:updateStatus}= await updateRestaurantStatus({variables:{isopen:!restaurantStatus,id:restaurantData.id}})
      
  }

  const handleEdit=(editData)=>{
      setEditPopUp(!editPopUp)
      setEditItems(editData)
  }


  return (
    <div className=' w-full min-h-screen h-full p-6 space-y-5'>
      {
         !editPopUp &&  

         <div className='space-y-4'>
          <p className='text-3xl text-center font-semibold '>Restaurant Dashboard</p>

          <div className='flex bg-white w-full p-2 rounded-lg justify-between items-center'>

                <p>{restaurantData?.name}</p>

              <div className='flex gap-x-5 w-fit'>
                <p>Restaurant Status</p>
                <button onClick={()=>handleRestaurantStatus()} className={`${restaurantStatus?"bg-green-500" :"bg-red-500"}  w-full rounded-lg text-white`}>{restaurantStatus? "Open" : "Closed" }</button>
              </div>
          </div>

          <p className='text-xl'>Menu</p>


          <div className='grid grid-cols-2 w-full  gap-x-4 gap-y-4'>

            { 

            restMenu?.allProducts &&
              
            restMenu?.allProducts?.nodes.map((Data,index)=>(
                
                <div className='big-card'>

                  <img className='w-[30%] h-[65%] rounded-md'  src={Data?.image || CommonImage} />

                  <div className='flex flex-col justify-center items-center gap-y-2'>
                    <p className='text-base'>{Data.name}</p>
                    <p className='price text-base'>${Data.price}</p>
                  </div>
                  <FaRegEdit className='edit-btn' onClick={()=>handleEdit(Data)} />         
                
              </div>

              ))
            }

          </div>

         </div>
      }
        

        {
            editPopUp &&
            
            <div className='w-full flex min-h-screen h-full justify-center'>
                <EditMenu data={editItems}  mode={"edit"} popup={setEditPopUp}/>
            </div>
        }


    </div>
  )
}

export default Overview