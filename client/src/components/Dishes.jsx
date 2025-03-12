import React, { useState } from 'react'
import '../css/global.css'
import { useQuery } from '@apollo/client'
import { GET_DISHES } from '../graphql/queries/restaurantQuery'
import { getPageUrl } from './common/GetPage'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import DishPopUp from './DishPopUp'
import { Header } from './Header'

const Dishes = () => {

    const navigate=useNavigate()
    const page=getPageUrl()
    const [isDishClicked, setIsDishClicked]=useState(false)
    const [popupData,setPopupData]=useState({})

    const {data,loading,error}=useQuery(GET_DISHES,{
        variables:{page:page},
        fetchPolicy:"no-cache"
    })

    const  handlePage=(curPage)=>{
        if(page>0){
            navigate(`/home/dishes?page=${curPage}`)
        }
    }

    const hadldeDish=(curdata)=>{
        console.log("curdata",curdata);
        
        setIsDishClicked(!isDishClicked)
        setPopupData(curdata)
        console.log(isDishClicked);
        
    }

  return (
    <div className='common py-5 px-10'>

        <div className='flex justify-center '>
            <Header/>
        </div>

        <div className='py-2 '>
            <p className='text-center text-xl font-medium pb-4'>Dishes</p>
            
            <div className="grid grid-cols-4 gap-4">
                {data?.getDishes.map((curdata) => (
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
                <p>{page}</p>
                <FaArrowRight onClick={()=>handlePage(page+1)} className='arrow' />
            </div>

            {isDishClicked && <DishPopUp Data={popupData} setIsDishClicked={setIsDishClicked} />}


        </div>
    </div>
  )
}

export default Dishes