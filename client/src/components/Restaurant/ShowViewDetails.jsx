import React from 'react'
import { RxCross1 } from "react-icons/rx";


const ShowViewDetails = ({setShowViewDetails,mapItem}) => {
    console.log("map  item ",mapItem);
    
  return (
    <div className='fixed inset-0 bg-blackop '>
        <div className='w-full h-full bg-transparent flex  justify-center items-center'>
            <div className='bg-white p-4 rounded-lg  space-y-2 relative'>
                <p className='text-center font-semibold text-lg'>Delivery details</p>
                <p>Order Id : {mapItem.order_id}</p>
                <p>Customer name : {mapItem.user_name}</p>
                <p>Address : {mapItem.address}</p>
                <p>Payment Status : {mapItem.payment_status}</p>
                <RxCross1 className='absolute top-0 right-5 text-md cursor-pointer' onClick={()=>setShowViewDetails(false)}/>
            </div>
        </div>
        
    </div>
  )
}

export default ShowViewDetails