import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../css/global.css'

import { useQuery } from "@apollo/client";
import { GET_DISHES, TOTAL_PAGE } from "../../graphql/queries/restaurantQuery";

import { getPageUrl } from "../common/GetPage";
import DishPopUp from "./DishPopUp";
import { Header } from "../Layouts/Header";
import { ArrowComponent } from "../common/ArrowComponent";

const Dishes = () => {
  const navigate = useNavigate();
  const page = getPageUrl();
  const offset=(page-1)*12
  const [isDishClicked, setIsDishClicked] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [totalPageCount, setTotalPageCount] = useState(1);


  const { data, loading, error } = useQuery(GET_DISHES, {
    variables: { first: 12, offset: offset},
    fetchPolicy: "no-cache"
  });

  if(data?.allProducts) console.log(">>>>>>>>>>>>.",data?.allProducts);


  const handlePageChange=(curPage)=>{
    if (curPage > 0 && curPage <= totalPageCount) 
      navigate(`/home/dishes?page=${curPage}`)
  }
  

  

  const hadldeDish = (curdata) => {
    setIsDishClicked(!isDishClicked);
    setPopupData(curdata);
  };

  useEffect(() => {

    if(data?.allProducts){
      setTotalPageCount(Math.ceil(data?.allProducts?. totalCount/12))
    }

  }, [data]);

  return (
    <div className="common py-5 px-10 h-screen  overflow-y-scroll">
      <div className="flex justify-center ">
        <Header />
      </div>

      <div className="py-2">
        <p className="text-center text-xl font-medium pb-4">Dishes</p>

        {loading ? (
          <p className="text-center text-lg pt-36 font-semibold">Loading</p>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-4">
              {data?.allProducts?.nodes.map((curdata) => (
                <div
                  key={curdata.id}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                  onClick={() => hadldeDish(curdata)}
                >
                  <img
                    src={curdata.image}
                    alt={curdata.name}
                    className="w-full h-36 object-contain rounded-lg"
                  />
                  <div className="text-center mt-2 space-y-1">
                    <p className="text-base font-medium">{curdata.name}</p>
                    <p className="text-md text-mango font-medium">
                      ${curdata.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <ArrowComponent  page={page} totalPage={totalPageCount}  handlePageChange={handlePageChange}/>
          </div>
        )}

        {isDishClicked && (
          <DishPopUp Data={popupData} setIsDishClicked={setIsDishClicked} />
        )}
      </div>
    </div>
  );
};

export default Dishes;
