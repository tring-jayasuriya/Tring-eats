import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import DishPopUp from './DishPopUp'

const DishGrid = ({items}) => {

    const [isDishClicked, setIsDishClicked]=useState(false)
    const [popupData,setPopupData]=useState({})

    const hadldeDish=(curdata)=>{
        console.log("curdata",curdata);
        
        setIsDishClicked(!isDishClicked)
        setPopupData(curdata)
        console.log(isDishClicked);
        
    }

  return (
    <div className='bg-litMango px-3 pb-9'>

            <div className="grid grid-cols-4 gap-4">
            {items.map((curdata) => (
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

export default DishGrid