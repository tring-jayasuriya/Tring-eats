import React, { useState } from 'react'
import '../css/global.css'
import  '../css/Homecss/dashboard.css'
import SmileWoman from '../assets/dashbord/simly-woman.png'
import { CategoryData } from '../category-data/item-list'
import { Dishes } from '../category-data/dishes-data'
import { Restaurant } from '../category-data/restaurant'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_RANDOM_DISH, GET_RANDOM_RESTAURANT } from '../graphql/queries/restaurantQuery'
import DishPopUp from './DishPopUp'


export const Dashboard = () => {

    const generalImage="https://img.freepik.com/free-vector/retro-restaurant-logo_23-2148490227.jpg?semt=ais_hybrid"

    const navigate=useNavigate()

    const [isDishClicked, setIsDishClicked] = useState(false);
    const [popupData, setPopupData] = useState({});
    
    const {data:randomDish,loading:RandomDishLoading,error:RandomDishError}=useQuery(GET_RANDOM_DISH,{fetchPolicy:"no-cache",variables:{name:"products"}})
    const {data,loading,error}=useQuery(GET_RANDOM_RESTAURANT,{fetchPolicy:"no-cache",variables:{name:"restaurant"}})

    console.log("random dish data >>>>>>>>>>>.",randomDish)
    console.log("random restaurant data >>>>>>>>>>>.",data)


    const hadldeDish = (curdata) => {
        console.log("curdata", curdata);
    
        setIsDishClicked(!isDishClicked);
        setPopupData(curdata);
        console.log(isDishClicked);
      };

      const allDishes=(curdata)=>{
        console.log(curdata);
        navigate(`/home/restaurant-dish?id=${curdata.id}`)
    }
    


    const handleRoute=(name)=>{
        navigate(`/home/${name}?page=1`)
    }


  return (
    <div className='w-full'>

        <div className=' banner bg-mango h-44 rounded-xl p-4 flex justify-between mb-8'>
            <div className='w-[60%]  text-white space-y-2'>
                <p className='voucher '>Get Discount Voucher</p>
                <p className='voucher'>up to 20%</p>
                <p className='text-xs pt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. </p>
            </div>
            <img className='object-contain h-full'  src={SmileWoman}/>
        </div>

        <div className='space-y-8'>

            <div className='space-y-4'>

                <div className='flex justify-between'>
                    <p className='subtitle'>Popular Dishes</p>
                    <p onClick={()=>handleRoute("dishes")} className='view-all'> {`view all >`} </p>
                </div>

                <div className='flex gap-x-3'>

                    {
                        randomDish?.getRandomDish.map((data)=>(
                            <div className='card cursor-pointer' onClick={()=>hadldeDish(data)}>
                                <img className='dish-image' src={data.image}/>

                                <div className='text-center space-y-1'>
                                    <p className='w-28 truncate'>{data.name}</p>
                                    <p className='price'>${data.price}</p>
                                </div>
                            </div>
                        ))

                    }

                </div>

            </div>

            <div className='space-y-4'>

                <div className='flex justify-between cursor-pointer'>
                    <p className='subtitle'>Popular Restaurant</p>
                    <p onClick={()=>handleRoute("popular-restaurant")} className='view-all'> {`view all >`} </p>
                </div>

                <div className='flex gap-x-3'>

                    {
                        data?.getRandomRestaurant.map((data)=>(
                            <div className='card cursor-pointer' onClick={()=>allDishes(data)}>
                                <img className='dish-image' src={data.image || generalImage} />
                                <p className='text-center w-fit'>{data.name}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='space-y-4'>
                <div className='flex justify-between'>
                    <p className='subtitle'>Category</p>
                    <p onClick={()=>handleRoute("category")} className='view-all'> {`view all >`} </p>
                </div>

                <div className='flex gap-x-3'>
                {
                    CategoryData.map((data)=>(
                        <div className='small-cards'>
                        <img className='category-img' src={data.image}/>
                        <p>{data.name}</p>
                    </div>
                    ))
                }
                </div>
            </div>





        </div>

        {isDishClicked && (
          <DishPopUp Data={popupData} setIsDishClicked={setIsDishClicked} />
        )}

    </div>
  )
}
