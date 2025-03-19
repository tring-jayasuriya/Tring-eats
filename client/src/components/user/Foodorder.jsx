import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../../css/global.css'

import { useMutation, useQuery } from '@apollo/client';
import { CONFIRM_ORDER, DELETE_ITEM, IS_RESTAURANT_OPEN } from '../../graphql/mutation/restaurantMutation';
import { GET_FROM_CART } from '../../graphql/queries/restaurantQuery';

import { toast } from 'react-toastify';
import { getLocalStorage } from '../common/GetLocalStorage';
import { RiDeleteBinLine } from "react-icons/ri";

const Foodorder = () => {

    const userId=getLocalStorage("user").id

    const {data,loading,error}=useQuery(GET_FROM_CART,{fetchPolicy:"no-cache", variables:{id:userId}})
    const [deleteItem]=useMutation(DELETE_ITEM,{fetchPolicy:"no-cache"})
    const [confirmOrder]=useMutation(CONFIRM_ORDER,{fetchPolicy:"no-cache"})
    const [isRestaurantOpen]=useMutation(IS_RESTAURANT_OPEN,{fetchPolicy:"no-cache"})
    const [cartItem,setCartItem]=useState([])
    const navigate=useNavigate()
  

    const [total,setTotal]=useState(0)



    console.log(data?.getCartItems);
    

    const handleDeleteItem=async(product_id)=>{
      
      const {data,loading,error}=await deleteItem({variables:{user_id:userId,product_id:parseInt(product_id)}})

      setCartItem((prev)=> prev.filter((cur)=>cur.id!==product_id))

      toast.success(data.deleteItem.message)
    }

    useEffect(()=>{
      if(data?.getCartItems) setCartItem(data.getCartItems.map((item)=>({...item,quantity:1})))
    },[data])


    useEffect(()=>{
       let curTotoal=cartItem.reduce((sum,item)=>sum+(item.quantity*item.price),0)
       setTotal(curTotoal)
    },[cartItem])


    const handleQuantity=(num,index)=>{
      const dupCart=[...cartItem]
      const curItem={...cartItem[index]}
      const quantity=curItem.quantity+(num)
      if(quantity>0 && quantity<=10) curItem.quantity=quantity

      dupCart[index]=curItem
      setCartItem(dupCart)
    }

    console.log(">>>>cart item ",cartItem);

    const handleConfirmOrder=async()=>{

        try{

            const {data:isopen}=await isRestaurantOpen({variables:{id:cartItem[0].restaurant_id}})

            if(!isopen.isRestaurantOpen.isopen){
              toast.error("can't order food. Restaurant currently closed")
              return
            }
              
            
          
            const orderItems= cartItem.map(({ id,quantity})=>({ product_id:parseInt(id),quantity}))
            console.log(">>>>>>",orderItems);

            
            
            
            const{data}=await confirmOrder({variables:{user_id:userId, total_price:total,orderItems:orderItems }}) 

            toast.success("order placed successfully wait for confirmation")

            setTimeout(()=>{
              navigate("/home?type=history")
            },1500)            

        }catch(err){
            console.log("err from confirm order foodorder ",err);
        }
      
    }

    console.log(cartItem);
    

    
  return (
    <div className='w-full space-y-5'>
        <p className='text-center font-semibold text-3xl'>My Cart</p>

        {cartItem?.length==0 && <h1 className='text-center text-lg'>Cart is empty</h1>}

        <div className='grid grid-cols-2 w-full  gap-x-4 gap-y-4'>

          { 

            cartItem.length>0 &&
            
            cartItem.map((Data,index)=>(
              
              <div className='big-card'>

                <img className='w-[30%] h-[65%] rounded-md'  src={Data.image} />

                <div className='flex flex-col text-center justify-center items-center gap-y-2'>
                  <p className='text-base '>{Data.name}</p>
                  <p className='price text-base'>${Data.price}</p>
                  <p className='text-xs '>{Data.restaurant_name}</p>
                </div>

                <div className='flex flex-col gap-y-3 min-w-28 pr-4 justify-center items-center'>

                  <div className=' text-base w-full flex rounded-lg p-1 bg-mango items-center justify-around text-white  '>
                    <p className='cursor-pointer' onClick={()=>handleQuantity(-1, index)}>-</p>
                    <p>{Data.quantity}</p>
                    <p className='cursor-pointer' onClick={()=>handleQuantity(1, index)}>+</p>
                  </div>
                  <RiDeleteBinLine onClick={()=>handleDeleteItem(Data.id)}  className='cursor-pointer w-full h-8  text-red-500 p-1 rounded-lg ' />
                  
                </div>              
              
            </div>

            ))
          }


        </div>
        
        {
          cartItem?.length>0 &&

          <div className='w-full flex flex-col p-3 mt-2 justify-center items-center space-y-3'>
          <p className='subtitle'>Order Summary</p>
            <div className='w-[55%] bg-white p-2 rounded-lg px-4'>
              <p className='pb-2 text-gray-800'>{cartItem.length} items</p>

              {cartItem.map((item)=>(

              <div className='text-base flex justify-between'>
                <p>{item.name} x {item.quantity}</p>
                <p>{item.price}</p>
              </div>

              ))}

              <hr className='border-black border-t-1 my-2 '/>
              

              <div className='flex justify-between font-semibold text-lg'>
                <p className='flex justify-between'>Total</p>
                <p>${total}</p>
              </div>

              <button onClick={()=>handleConfirmOrder()} className='bg-mango w-full text-white mt-2 p-1  rounded-lg text-lg'>Confirm order</button>
            </div>
          </div>
        }

    </div>
  )
}

export default Foodorder