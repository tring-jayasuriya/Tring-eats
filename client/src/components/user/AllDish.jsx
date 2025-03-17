import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_MENU } from '../../graphql/queries/restaurantQuery'
import { useLocation } from 'react-router-dom'

import '../../css/global.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import DishPopUp from '../DishPopUp'

const AllDish = () => {

    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const [isDishClicked, setIsDishClicked]=useState(false)
    const [popupData,setPopupData]=useState({})
    const restaurantId=queryParams.get("id") || 1

    const {data,loading,error}=useQuery(GET_MENU,{fetchPolicy:"no-cache",variables:{id:parseInt(restaurantId)}})

    const hadldeDish=(curdata)=>{
        console.log("curdata",curdata);
        
        setIsDishClicked(!isDishClicked)
        setPopupData(curdata)
        console.log(isDishClicked);
    }


    

    // const  handlePage=(curPage)=>{
    //     // if(page>0){
    //     //     navigate(`/home/restaurant-dish?id=${curdata.id}`)
    //     // }
    // }

  return (
    <div className='common p-10'>
        <p className='text-center pb-3 text-xl font-medium'>Dishes</p>
        
        <div className="grid grid-cols-4 gap-4">
            {data?.getMenu.map((curdata) => (
                <div key={curdata.id}className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md" onClick={()=>hadldeDish(curdata)} >
                <img
                    src={curdata.image}
                    alt={curdata.name}
                    className="w-full h-36 object-contain rounded-lg"
                />
                <div className="text-center mt-2 space-y-1">
                    <p className="text-base font-semibold">{curdata.name}</p>
                    <p className="text-md text-mango font-semibold">${curdata.price}</p>
                </div>
                </div>
            ))}
        </div>

        <div className='flex justify-center items-center space-x-8 mt-10 text-lg'>
            <FaArrowLeft onClick={()=>handlePage(page-1)} className='arrow'/>
            {/* <p>{page}</p> */}
            <FaArrowRight onClick={()=>handlePage(page+1)} className='arrow' />
        </div>

        {isDishClicked && <DishPopUp Data={popupData} setIsDishClicked={setIsDishClicked} />}

    </div>
  )
}

export default AllDish