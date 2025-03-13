import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ORDER_HISTORY } from '../graphql/queries/restaurantQuery'
import { getLocalStorage } from './common/GetLocalStorage'
import _ from 'lodash'
import { HistoryTable } from './HistoryTable'

const OrderHistory = () => {

  const id=getLocalStorage("user").id 

  const {data,refetch}=useQuery(GET_ORDER_HISTORY,{fetchPolicy:"no-cache",variables:{id:id}})
  const [groupedOrder,setGroupedOrder]=useState(null)


    useEffect(()=>{
      if(data?.getOrderHistory){
        console.log(">>>>");
        
        const GroupedOrder=_.groupBy(data.getOrderHistory,"order_id")
        setGroupedOrder(GroupedOrder)
        
      }
  
    },[data])

    console.log(groupedOrder);
    console.log(">>>>> order history", data?.getOrderHistory);
  

  return (
    // <div>
    //   <p>OrderHistory</p>

    //   <div className='flex flex-wrap gap-3 p-5'>
    //   {
    //     groupedOrder!==null && 
    //     Object.entries(groupedOrder).map(([OrderId,OrderItems],index)=>(
    //         <div className=' bg-white mx-auto p-2 rounded space-y-2  '>
    //           <div className='pt-2'>
    //             <p>Order Id : {OrderId}</p>
    //             {
    //               OrderItems.map((items,index)=>(
    //                 <div className='flex gap-x-4 '>

    //                   <p>{items.product_name}</p>
    //                   <p>x</p>
    //                   <p>{items.quantity}</p>
    //                   {/* <p>{items.order_status}</p> */}
    //                 </div>
    //               ))
    //             }

                
    //           </div>

             
    //         </div>    

    //     ))
    //   }
      
    // </div>


    // </div>
    

    <div className='space-y-4'>
      <p className='font-medium'>Order summary</p>
     { data?.getOrderHistory &&
      <HistoryTable groupedOrder={groupedOrder}/>}
    </div>
  )
}

export default OrderHistory