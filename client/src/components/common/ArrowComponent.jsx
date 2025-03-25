import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const ArrowComponent = ({  page ,totalPage,handlePageChange }) => {

  return (
    <div className="flex justify-around items-center space-x-8  text-lg mt-6">
      <FaArrowLeft onClick={() => handlePageChange(page-1)} className="arrow" />
      <p>{page} of {totalPage}</p>
      <FaArrowRight onClick={() => handlePageChange(page+1)} className="arrow" />
    </div>
  );
};
