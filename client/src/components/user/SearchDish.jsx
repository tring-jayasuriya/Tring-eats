import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { SEARCH_DISH } from '../../graphql/queries/restaurantQuery'

import DishGrid from './DishGrid'
import { Header } from '../Layouts/Header'

const SearchDish = () => {

    const navigate=useNavigate()
    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)

    const page=parseInt(queryParams.get("page"))
    const offset=(page-1)*12
    const {search}=location.state

    console.log("my search ",search);
    

    const {data,loading}=useQuery(SEARCH_DISH,{fetchPolicy:"no-cache",variables:{name:search,offset:offset}}) 

    console.log("serach data ",data?.allProducts);

    if(loading) return <h1 className='text-center w-full pt-36 text-3xl font-semibold '>Loading ... </h1>
    
     
  return (
    <div className='w-[75%] text-center bg-litMango pt-10 overflow-y-scroll'>
      <Header/>
        <p className='w-full text-center p-5 text-3xl font-semibold'>Dishes</p>
        {data?.allProducts?
            <DishGrid items={data?.allProducts} page={page} search={search}/> : <p>No dishes found</p>
        }
        
    </div>
  )

}

export default SearchDish