import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TOTAL_PAGE } from "../graphql/queries/restaurantQuery";
import { useNavigate } from "react-router-dom";

export const ArrowComponent = ({ name, page }) => {
  const [totalPageCount, setTotalPageCount] = useState(1);
  const navigate=useNavigate()

  const {
    data: TotalPageCount,
    loading: PageCountLoading,
    error: pageCountError,
  } = useQuery(TOTAL_PAGE, {
    variables: { name: name },
  });

  const handlePage = (curPage) => {
    if (curPage > 0 && curPage <= totalPageCount) {
      name=="restaurant"? navigate(`/home/popular-restaurant?page=${curPage}`)  : navigate(`/home/dishes?page=${curPage}`);
    }
  };

  useEffect(() => {
    if (!PageCountLoading) {
      setTotalPageCount(parseInt(TotalPageCount.getTotalPage.totalPage / 12));
    }
  }, [PageCountLoading]);

  return (
    <div className="flex justify-around items-center space-x-8  text-lg mt-6">
      <FaArrowLeft onClick={() => handlePage(page - 1)} className="arrow" />
      <p>{page} of {totalPageCount}</p>
      <FaArrowRight onClick={() => handlePage(page + 1)} className="arrow" />
    </div>
  );
};
