import React, { useState } from 'react'
import { ViewDetailsPopup } from '../ViewDetailsPopup'

export const HistoryTable = ({groupedOrder}) => {

    const [viewPopup,setViewPopup]=useState(false)
    const [details,setDetails]=useState([])

    const handlePopup=(OrderItems)=>{
        setDetails(OrderItems)
        setViewPopup(true)
    }

  return (
     <div className='flex flex-col gap-y-2 text-sm'> 

        <div className='flex justify-between bg-white px-4 py-2 rounded-md font-medium '>
            <p className='w-40'>Restaurant name</p>
            <p>Order status</p>
            <p>Payment status</p>
            <p>Price</p>
            <p>details</p>
        </div>             

            {
                groupedOrder!==null && 
                groupedOrder.map(({ order_id, orders},index)=>{
                        const orderDetails=orders[0]
                        return(
                                <div className='flex justify-between items-start bg-white px-4 py-2 rounded-md text-left' key={order_id}>
                                    <p className='w-40'>{orderDetails?.restaurant_name}</p>
                                    <p className={`w-15 ${orderDetails?.order_status==='success'?'success': orderDetails?.order_status==='pending'?'pending': 'cancel' } common-status-btn`} >{orderDetails?.order_status}</p>
                                    <p className={`w-15 ${orderDetails?.payment_status==='paid'?'success':'cancel' } common-status-btn`}>{orderDetails?.payment_status}</p>
                                    <p>${orderDetails?.total_price}</p>
                                    <p onClick={()=>handlePopup(orders)} className='cursor-pointer'>view</p>
                                </div>
                        )
                    })
            }
      

            {
                viewPopup && <ViewDetailsPopup setPopup={setViewPopup} data={details} viewPopup={viewPopup}/>
            }


       
    </div>

  )
}
