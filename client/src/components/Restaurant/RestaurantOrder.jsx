import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ORDER_DETAILS } from "../../graphql/queries/restaurantQuery";
import { getLocalStorage } from "../common/GetLocalStorage";
import _ from "lodash";
import { ORDER_STATUS } from "../../graphql/mutation/restaurantMutation";
import { RestaurantOrderTable } from "./RestaurantOrderTable";
import ShowViewDetails from "./ShowViewDetails";

const RestaurantOrder = () => {
  const restaurantId = getLocalStorage("restaurant").id;
  const [groupedOrder, setGroupedOrder] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewDetailsData, setViewDetailsData]=useState({})

  const { data, loading, error, refetch } = useQuery(ORDER_DETAILS, {
    fetchPolicy: "no-cache",
    variables: { id: restaurantId },
  });

  const [orderStatus, { data: orderResponse }] = useMutation(ORDER_STATUS, {
    fetchPolicy: "no-cache",
  });

  const handleViewDetails=(data)=>{
    console.log( "view details data",data);
    
    setViewDetailsData(data)
    setShowViewDetails(true)
  }

  useEffect(() => {
    if (data?.orderDetails) {
      console.log(">>>>");

      const GroupedOrder = _.groupBy(data.orderDetails, "order_id");

      const sortedGroupedOrder = Object.entries(GroupedOrder)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([order_id, orders]) => ({ order_id: Number(order_id), orders }));

      setGroupedOrder(sortedGroupedOrder);
    }
  }, [data]);

  const handleOrderStauts = async (name, order_id) => {
    console.log(name, order_id);
    await orderStatus({ variables: { orderId: order_id, orderStatus: name } });
    refetch();
  };

  console.log(orderResponse?.orderStatus);

  return (
    <div className="grid grid-cols-3  gap-3 p-5">
      {groupedOrder !== null &&
        groupedOrder.map(({ order_id, orders }, index) => {
          const mapItem = orders[0];
          console.log(">>.", mapItem);

          return (
            <div className=" bg-white mx-auto p-2 rounded space-y-2  ">
              <div className="pt-2">
                <p>Order Id : {order_id}</p>
                {orders.map((items, index) => (
                  <div className="flex gap-x-4 ">
                    <p>{items.product_name}</p>
                    <p>x</p>
                    <p>{items.quantity}</p>
                  </div>
                ))} 
              </div>

              {mapItem?.order_status !== "pending" ? (
                <p className={`${mapItem?.order_status === "success"? "text-green-500"  : "text-red-500"}`}>Order status : {mapItem?.order_status}</p>
              ) : (
                <div>
                  <button
                    className="bg-gray-500 p-1 rounded text-white mr-3"
                    onClick={() =>
                      handleOrderStauts("success", parseInt(order_id))
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="p-1 rounded text-white mr-3 bg-red-400"
                    onClick={() =>
                      handleOrderStauts("cancelled", parseInt(order_id))
                    }
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                className="text-center w-full text-sm"
                onClick={() => handleViewDetails(mapItem)}
              >
                View details
              </button>
            </div>
          );
        })}

            {showViewDetails && 
             <ShowViewDetails
                setShowViewDetails={setShowViewDetails}
                mapItem={viewDetailsData}
            />}
    </div>
  );
};

export default RestaurantOrder;
