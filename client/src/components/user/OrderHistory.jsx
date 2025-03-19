import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { GET_ORDER_HISTORY } from '../../graphql/queries/restaurantQuery'

import { getLocalStorage } from '../common/GetLocalStorage'
import { HistoryTable } from './HistoryTable'
import { getPageUrl } from '../common/GetPage'
import { ArrowComponent } from '../common/ArrowComponent'
import _ from 'lodash'

const OrderHistory = () => {

  const id=getLocalStorage("user").id 
  const page=getPageUrl()

  const {data,refetch,loading}=useQuery(GET_ORDER_HISTORY,{fetchPolicy:"no-cache",variables:{id:id,page:page}})
  const [groupedOrder,setGroupedOrder]=useState([])


    useEffect(()=>{
      if(data?.getOrderHistory){
        const GroupedOrder=_.groupBy(data.getOrderHistory,"order_id")

        const sortedGroupedOrder = Object.entries(GroupedOrder)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([order_id, orders]) => ({ order_id: Number(order_id), orders }));

        setGroupedOrder(sortedGroupedOrder)
       
      }
      refetch()
  
    },[data])  

    if(loading) return (<p className='h-full text-center text-3xl font-bold'>Loading! Please wait</p>)

  return (

    <div className='w-full space-y-4'> 
      <p className='font-medium text-center'>Order summary</p>
     { data?.getOrderHistory &&
      <HistoryTable groupedOrder={groupedOrder}/>}
      <ArrowComponent  name={"orders"} page={page}/>
    </div>
  )
}

export default OrderHistory