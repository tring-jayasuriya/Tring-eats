import React from "react";
import { RxCross2 } from "react-icons/rx";

export const ViewDetailsPopup = ({ setPopup, data, viewPopup }) => {
  console.log( data, viewPopup);

  return (
    <div className="inset-0 bg-blackop fixed">
      <div className="flex justify-center items-center h-full w-full bg-transparent ">
        <div className="bg-white px-9 py-4 rounded-lg space-y-3 text-center text-base relative">
            <RxCross2 className="absolute  right-5 text-lg cursor-pointer"  onClick={()=>setPopup(false)}/>
            <p className="font-semibold"> Orders</p>
          {data.map((data, index) => (
            <div className="flex space-x-4">
              <p>{data.product_name}</p>
              <p>{data.quantity}</p>
            </div>
          ))}
          <button className="p-2 w-full rounded-lg bg-green-500 font-medium text-white">Pay now</button>
        </div>
      </div>
    </div>
  );
};
