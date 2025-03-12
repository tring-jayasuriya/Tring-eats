import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ORDER_DETAILS } from '../../graphql/queries/restaurantQuery'
import { getLocalStorage } from '../common/GetLocalStorage'
import _ from 'lodash'
import { ORDER_STATUS } from '../../graphql/mutation/restaurantMutation'

const RestaurantOrder = () => {

  const restaurantId=getLocalStorage("restaurant").id
  const [groupedOrder,setGroupedOrder]=useState(null)
  

  const {data,loading,error}=useQuery(ORDER_DETAILS,{fetchPolicy:"no-cache", variables:{id:restaurantId}})
  const [orderStatus,{data:orderResponse}]=useMutation(ORDER_STATUS,{fetchPolicy:"no-cache"})

  console.log(data?.orderDetails);

  useEffect(()=>{
    if(data?.orderDetails){
      console.log(">>>>");
      
      const GroupedOrder=_.groupBy(data.orderDetails,"order_id")
      setGroupedOrder(GroupedOrder)
      console.log(GroupedOrder);
    }

  },[data])

  const  handleOrderStauts=async (name,order_id)=>{

    console.log(name,order_id);
    await orderStatus({variables:{orderId:order_id,orderStatus:name}})   

  }

  console.log(orderResponse?.orderStatus);
  
  return (
    <div className='flex flex-wrap gap-3 p-5'>
      {
        groupedOrder!==null && 
        Object.entries(groupedOrder).map(([OrderId,OrderItems],index)=>{

              const mapItem=OrderItems[index]
              return(

                <div className=' bg-white mx-auto p-2 rounded space-y-2  '>
                  <div className='pt-2'>
                    <p>Order Id : {OrderId}</p>
                    {
                      OrderItems.map((items,index)=>(
                        <div className='flex gap-x-4 '>
    
                          <p>{items.product_name}</p>
                          <p>x</p>
                          <p>{items.quantity}</p>
                        </div>
                      ))
                    }
                  </div>
                  {
                    mapItem?.order_status!=="pending" ? <p>Order status : { mapItem?.order_status}</p> :
                    <div>
                      <button className='bg-gray-500 p-1 rounded text-white mr-3' onClick={()=>handleOrderStauts("success",parseInt(OrderId))}>Accept</button>
                      <button className='p-1 rounded text-white mr-3 bg-red-400' onClick={()=>handleOrderStauts("cancelled",parseInt(OrderId))}>Cancel</button>
                    </div>

                  }
    
                  
                </div>   

              )

 

        })
      }
      
    </div>
  )
}

export default RestaurantOrder