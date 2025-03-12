import React from 'react'
import { Dishes } from '../category-data/dishes-data'
import { CategoryData } from '../category-data/item-list'
import { Restaurant } from '../category-data/restaurant'
import { useLocation } from 'react-router-dom'
import '../css/global.css'
import { useQuery } from '@apollo/client'
import { GET_ALL_DATA } from '../graphql/queries/restaurantQuery'


const CommmonComp = () => {

    const location=useLocation()
    const {name}=location.state
    const queryParams=new URLSearchParams(location.search)
    const page=queryParams.get("page") || "1"
    
    console.log(page);
    
    console.log(name);

    // const [{data,loading,error}]=useQuery(GET_ALL_DATA,{variables:{name,page}, fetchPolicy:"no-cache"})

    console.log(">>>>>>>log",getData?.data);
    console.log(">>>>>>>log",data,loading);


    const renderData={
        dishes:Dishes,
        category:CategoryData,
        restaurant:Restaurant
    }

    const SelectedData=renderData[name] || []


    

  return (
    <div className='h-full bg-litMango min-h-screen mx-auto'>
        <p>{name}</p>

        <div className='flex gap-x-3 flex-wrap'>

            {
                SelectedData.map((data)=>(
                    <div className='card'>
                        <img className='dish-image' src={data.image}/>

                        <div className='text-center space-y-1'>
                            <p>{data.name}</p>
                            <p className='price'>{data?.price}</p>
                        </div>
                    </div>
                ))

            }

        </div>
        


    </div>
  )
}

export default CommmonComp