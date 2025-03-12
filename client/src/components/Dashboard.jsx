import React from 'react'
import '../css/global.css'
import  '../css/Homecss/dashboard.css'
import SmileWoman from '../assets/dashbord/simly-woman.png'
import { CategoryData } from '../category-data/item-list'
import { Dishes } from '../category-data/dishes-data'
import { Restaurant } from '../category-data/restaurant'
import { useNavigate } from 'react-router-dom'


export const Dashboard = () => {

    const navigate=useNavigate()


    const handleRoute=(name)=>{
        navigate(`/home/${name}?page=1`)
    }


  return (
    <div className='w-full  space-y-8'>

        <div className=' banner bg-mango h-44 rounded-xl p-4 flex justify-between'>
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
                        Dishes.map((data)=>(
                            <div className='card'>
                                <img className='dish-image' src={data.image}/>

                                <div className='text-center space-y-1'>
                                    <p>{data.name}</p>
                                    <p className='price'>${data.price}</p>
                                </div>
                            </div>
                        ))

                    }

                </div>

            </div>

            <div className='space-y-4'>

                <div className='flex justify-between'>
                    <p className='subtitle'>Popular Restaurant</p>
                    <p onClick={()=>handleRoute("popular-restaurant")} className='view-all'> {`view all >`} </p>
                </div>

                <div className='flex gap-x-3'>

                    {
                        Restaurant.map((data)=>(
                            <div className='card'>
                                <img className='dish-image' src={data.image} />
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

    </div>
  )
}
