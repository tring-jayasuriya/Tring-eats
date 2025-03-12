import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import '../css/global.css'

import { RxCross2 } from "react-icons/rx";
import { ADD_TO_CART } from '../graphql/mutation/restaurantMutation';
import { toast } from 'react-toastify';
import { getLocalStorage } from './common/GetLocalStorage';

const DishPopUp = ({Data,setIsDishClicked}) => {

    const [addToCart,{data,loading,error}]=useMutation(ADD_TO_CART,{fetchPolicy:"no-cache"})
    const userId=getLocalStorage("user").id

    console.log(Data);
    const dup={...Data}

    const handleAddCart= async()=>{
        
        try{

            console.log(">>>>>>>>>> dup",typeof(dup.id),typeof(dup.restaurant_id));
            

            const {data}=await addToCart({
                variables:{product_id:parseInt(dup.id),restaurant_id:dup.restaurant_id,user_id:userId}
            })

            toast.success("dish added to cart")

            setTimeout(()=>{
                setIsDishClicked(false)
            },500)

            

        }catch(err){
            console.log(err);
            toast.error(err.message)
            setTimeout(()=>{
                setIsDishClicked(false)
            },500)
        }
    }

    console.log("cart response",data?.addToCart);
    

  return (
    <div className='fixed flex inset-0 justify-center items-center bg-blackop  z-100'>
        <div className='w-[27%] bg-white px-1 py-4 relative space-y-2  rounded-lg flex flex-col items-center'>
            <RxCross2 className='absolute right-3 top-1 cursor-pointer text-xl' onClick={()=>setIsDishClicked(false)}/>
            <img className='w-[90%] h-44 rounded-lg' src={Data.image}/>
            <p className='subtitle'>{Data.name}</p>
            <p className='text-sm'>{Data.restaurant_name}</p>
            <p className='price'>${Data.price}</p>

            <button className='bg-mango text-white w-[90%] rounded-lg p-2' onClick={()=>handleAddCart()}>Add to cart</button>
        </div>
    </div>

  )
}

export default DishPopUp