import React, { useEffect, useState } from 'react'
import DishPopUp from './DishPopUp'
import { useNavigate } from 'react-router-dom'
import { ArrowComponent } from '../common/ArrowComponent'

const DishGrid = ({items,page,search}) => {

    const navigate=useNavigate()
    const [isDishClicked, setIsDishClicked]=useState(false)
    const [popupData,setPopupData]=useState({})
    const [totalPage,setTotalPage]=useState(0)

    console.log("dish grid  data",items);
    console.log("dish grid  page",page);
    console.log(" what i search",search);
    console.log("totalPage",totalPage);

    const hadldeDish=(curdata)=>{
        setIsDishClicked(!isDishClicked)
        setPopupData(curdata)
    }

    const handlePageChange=(curPage)=>{
        if (curPage > 0 && curPage <= totalPage) 
            navigate(`/home/search?page=${curPage}`,{state:{search:search}})
    }

    useEffect(()=>{
        setTotalPage(Math.ceil(items.totalCount/12))
    })



  return (
    <div className='bg-litMango px-3 pb-9'>

        {totalPage===0 && <p>No  dishes found</p>} 

        {
            totalPage >0 &&
            <div className="grid grid-cols-4 gap-4">
            {items?.nodes?.map((curdata) => (
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
        }

        {totalPage>0 && <ArrowComponent page={page} totalPage={totalPage} handlePageChange={handlePageChange} />}


        {isDishClicked && <DishPopUp Data={popupData} setIsDishClicked={setIsDishClicked} />}

    </div>
  )
}

export default DishGrid