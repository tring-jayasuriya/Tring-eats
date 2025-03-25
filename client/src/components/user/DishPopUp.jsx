import React from 'react'

import '../../css/global.css'

import { useMutation} from '@apollo/client'
import { ADD_TO_CART } from '../../graphql/mutation/restaurantMutation';

import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { getLocalStorage } from '../common/GetLocalStorage';

const DishPopUp = ({Data,setIsDishClicked}) => {

    console.log("popup data",Data);
    

    const [addToCart,{data,loading,error}]=useMutation(ADD_TO_CART,{fetchPolicy:"no-cache"})

    const dup={...Data}

    const handleAddCart= async()=>{
        
        try{

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


  return (
    <div className='fixed flex inset-0 justify-center items-center bg-blackop  z-100'>
        <div className='w-[27%] bg-white px-1 py-4 relative space-y-2  rounded-lg flex flex-col items-center'>
            <RxCross2 className='absolute right-3 top-1 cursor-pointer text-xl' onClick={()=>setIsDishClicked(false)}/>
            <img className='w-[90%] h-44 rounded-lg' src={Data.image}/>
            <p className='subtitle'>{Data.name}</p>
            <p className='text-sm'>{Data?.restaurantByRestaurantid?.name}</p>
            <p className='price'>${Data.price}</p>

            <button className='bg-mango text-white w-[90%] rounded-lg p-2' onClick={()=>handleAddCart()}>Add to cart</button>
        </div>
    </div>

  )
}

export default DishPopUp