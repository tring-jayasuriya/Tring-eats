import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ORDER_HISTORY } from '../graphql/queries/restaurantQuery'
import { getLocalStorage } from './common/GetLocalStorage'
import _ from 'lodash'
import { HistoryTable } from './HistoryTable'
import { getPageUrl } from './common/GetPage'
import { ArrowComponent } from './ArrowComponent'

const OrderHistory = () => {

  const id=getLocalStorage("user").id 
  const page=getPageUrl()

  console.log("?>> page",page);
  

  const {data,refetch}=useQuery(GET_ORDER_HISTORY,{fetchPolicy:"no-cache",variables:{id:id,page:page}})
  const [groupedOrder,setGroupedOrder]=useState([])


    useEffect(()=>{
      if(data?.getOrderHistory){
        const GroupedOrder=_.groupBy(data.getOrderHistory,"order_id")

        const sortedGroupedOrder = Object.entries(GroupedOrder)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([order_id, orders]) => ({ order_id: Number(order_id), orders }));


        console.log(">>>> sorted grouped order", sortedGroupedOrder);

        console.log("grouped order", GroupedOrder);
        
        
        setGroupedOrder(sortedGroupedOrder)
       
      }
      refetch()
  
    },[data])

    console.log(groupedOrder);
    console.log(">>>>> order history", data?.getOrderHistory);
  

  return (

    <div className='w-full space-y-4'>
      <p className='font-medium'>Order summary</p>
     { data?.getOrderHistory &&
      <HistoryTable groupedOrder={groupedOrder}/>}
      <ArrowComponent  name={"orders"} page={page}/>
    </div>
  )
}

export default OrderHistory