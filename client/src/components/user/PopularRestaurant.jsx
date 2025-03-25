import React, { useEffect, useState } from "react";

import '../../css/global.css'
import { getPageUrl } from "../common/GetPage";
import { GET_REST, TOTAL_PAGE } from "../../graphql/queries/restaurantQuery";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ArrowComponent } from "../common/ArrowComponent";

const PopularRestaurant = () => {
  const navigate = useNavigate();

  const page = getPageUrl();

  const generalImage="https://img.freepik.com/free-vector/retro-restaurant-logo_23-2148490227.jpg?semt=ais_hybrid"

  const [totalPageCount, setTotalPageCount] = useState(1);

  const offset=(page-1)*12

  const { data, loading, error } = useQuery(GET_REST, {
    variables: { first:12,offset:offset},
    fetchPolicy: "no-cache",
  });

  const allDishes = (curdata) => {
    console.log(curdata);
    navigate(`/home/restaurant-dish?page=1`,{state:{id:curdata?.id,name:curdata.name}});
  };

  const handlePageChange=(curPage)=>{
    if (curPage > 0 && curPage <= totalPageCount) {
        navigate(`/home/popular-restaurant?page=${curPage}`)
    }
  }

  useEffect(()=>{
    if(data?.allRestaurants){
      setTotalPageCount(Math.ceil(data?.allRestaurants?.totalCount/12))
    }
  })


  console.log(">>>>>>>", data?.allRestaurants);

  return (  
    <div className="common p-4 pb-10 h-screen  overflow-y-scroll">
      <p className="text-center text-3xl pt-4 font-semibold mt-1">Restaurants</p>
      <div className="grid grid-cols-4 gap-4 p-9">
        {data?.allRestaurants?.nodes.map((curdata) => (
          <div
            key={curdata.id}
            className={` bg-white p-4 rounded-xl relative text-black shadow-sm hover:shadow-md`}
            onClick={() => curdata.isopen && allDishes(curdata)}
          >
            <img
              src={curdata.image || generalImage}
              alt={curdata.name}
              className="w-full h-24 object-contain rounded-lg"
            />
            <div className="text-center mt-2 space-y-1">
              <p className="text-base font-semibold">{curdata.name}</p>
            </div>

            {!curdata.isopen && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                <span className="text-white text-xl font-bold">Closed</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <ArrowComponent  page={page} totalPage={totalPageCount} handlePageChange={handlePageChange} />
    </div>
  );
};

export default PopularRestaurant;
