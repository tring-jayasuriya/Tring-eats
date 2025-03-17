import { useQuery } from '@apollo/client'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SEARCH_DISH } from '../graphql/queries/restaurantQuery'
import DishGrid from './DishGrid'

const SearchDish = () => {

    const navigate=useNavigate()
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)

    const page=parseInt(queryParams.get("page"))
    const {search}=location.state

    console.log(">>>>>>>>>>>>",search);
    

    const {data}=useQuery(SEARCH_DISH,{fetchPolicy:"no-cache",variables:{name:search,page:page}})

    console.log(">>>>>>>>>>> page",page);
    console.log(">>>>>>>>> serach data ",data?.searchDish);
    
     
  return (
    <div className='w-[75%] text-center bg-litMango'>
        <p className='w-full text-center p-5 text-3xl font-semibold'>Dishes</p>
        {data?.searchDish?.length>0 ?
            <DishGrid items={data?.searchDish} page={page}/> : <p>No dishes found</p>
        }
        
    </div>
  )
}

export default SearchDish