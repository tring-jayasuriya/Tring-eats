import React from 'react'
import '../css/global.css'
import { getPageUrl } from './common/GetPage'
import { GET_REST } from '../graphql/queries/restaurantQuery'
import { useQuery } from '@apollo/client'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const PopularRestaurant = () => {

        const navigate=useNavigate()

        const page=getPageUrl()
    
        const {data,loading,error}=useQuery(GET_REST,{
            variables:{page:page},
            fetchPolicy:"no-cache"
        })

        
    const  handlePage=(curPage)=>{
        if(page>0){
            navigate(`/home/popular-restaurant?page=${curPage}`)
        }
        console.log(curPage);
    }

    const allDishes=(curdata)=>{
        console.log(curdata);
        navigate(`/home/restaurant-dish?id=${curdata.id}`)
    }
    

        console.log(">>>>>>>", data);
        
  return (
    <div className='common p-4 pb-10'>
        <p className='text-center text-xl font-medium mt-1'>Restaurant</p>
        <div className="grid grid-cols-4 gap-4 p-9">
            {data?.getRest.map((curdata) => (
                <div key={curdata.id}className="bg-white p-4 rounded-xl  shadow-sm hover:shadow-md " onClick={()=>allDishes(curdata)} >
                <img
                    src={curdata.image}
                    alt={curdata.name}
                    className="w-full h-24 object-contain rounded-lg"
                />
                <div className="text-center mt-2 space-y-1">
                    <p className="text-base font-semibold">{curdata.name}</p>
                </div>
                </div>
            ))}
        </div>

        <div className='flex justify-center items-center space-x-8  text-lg'>
            <FaArrowLeft onClick={()=>handlePage(page-1)} className='arrow'/>
            <p>{page}</p>
            <FaArrowRight onClick={()=>handlePage(page+1)} className='arrow' />
        </div>
        
    </div>
  )
}

export default PopularRestaurant