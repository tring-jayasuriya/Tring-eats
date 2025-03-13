import React from "react";

export const RestaurantOrderTable = ({ groupedOrder }) => {
  console.log(groupedOrder);

  return (
    <div className="px-6 py-5">
      <p className="text-center text-2xl">Orders</p>
      <div className="flex flex-col gap-y-2 text-sm mt-4">

        <div className="flex justify-between bg-white px-4 py-2 rounded-md font-medium ">
          <p>Id</p>
          <p>Order status</p>
          <p>Payment status</p>
          <p>Price</p>
          <p>details</p>
        </div>

        {
            groupedOrder!==null && 
            Object.entries(groupedOrder).map(([OrderId,OrderItems],index)=>{
                    const orderDetails=OrderItems[0]
                    return(
                        <div className='flex justify-between items-center bg-white px-4 py-2 rounded-md text-left '>
                            <p>{orderDetails?.order_id}</p>
                            {/* <p className='min-w-40'>{orderDetails?.}</p> */}
                            <p className={`${orderDetails?.order_status==='success'?'success': orderDetails?.order_status==='pending'?'pending': 'cancel' } common-status-btn`} >{orderDetails?.order_status}</p>
                            <p className={`${orderDetails?.payment_status==='paid'?'success':'cancel' } common-status-btn`}>{orderDetails?.payment_status}</p>
                            <p>${orderDetails?.total_price}</p>
                            <p onClick={()=>handlePopup(OrderItems)} className='cursor-pointer'>view</p>
                        </div>
                    )
                })
            }


      </div>
    </div>
  );
};
