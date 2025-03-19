import React, { useState } from "react";

import '../../css/global.css'
import { getPageUrl } from "../common/GetPage";
import { GET_REST, TOTAL_PAGE } from "../../graphql/queries/restaurantQuery";
import { useQuery } from "@apollo/client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowComponent } from "../common/ArrowComponent";

const PopularRestaurant = () => {
  const navigate = useNavigate();

  const page = getPageUrl();

  const generalImage="https://img.freepik.com/free-vector/retro-restaurant-logo_23-2148490227.jpg?semt=ais_hybrid"

  const [totalPageCount, setTotalPageCount] = useState(1);

  const {
    data: TotalPageCount,
    loading: PageCountLoading,
    error: pageCountError,
  } = useQuery(TOTAL_PAGE, {
    variables: { name: "products" },
  });

  const { data, loading, error } = useQuery(GET_REST, {
    variables: { page: page },
    fetchPolicy: "no-cache",
  });

  const handlePage = (curPage) => {
    if (page > 0) {
      navigate(`/home/popular-restaurant?page=${curPage}`);
    }
    console.log(curPage);
  };

  const allDishes = (curdata) => {
    console.log(curdata);
    navigate(`/home/restaurant-dish?id=${curdata.id}`);
  };

  console.log(">>>>>>>", data);

  return (
    <div className="common p-4 pb-10 h-screen  overflow-y-scroll">
      <p className="text-center text-3xl pt-4 font-semibold mt-1">Restaurants</p>
      <div className="grid grid-cols-4 gap-4 p-9">
        {data?.getRest.map((curdata) => (
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

      <ArrowComponent name={"restaurant"} page={page} />
    </div>
  );
};

export default PopularRestaurant;
