import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ORDER_DETAILS } from "../../graphql/queries/restaurantQuery";
import { ORDER_STATUS } from "../../graphql/mutation/restaurantMutation";

import ShowViewDetails from "./ShowViewDetails";
import { getLocalStorage } from "../common/GetLocalStorage";
import _ from "lodash";

const RestaurantOrder = () => {
  const restaurantId = getLocalStorage("restaurant").id;
  const [groupedOrder, setGroupedOrder] = useState([]);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState({});

  const { data, loading, error, refetch } = useQuery(ORDER_DETAILS, {
    fetchPolicy: "no-cache",
    variables: { id: restaurantId },
  });

  const [orderStatus, { data: orderResponse }] = useMutation(ORDER_STATUS, {
    fetchPolicy: "no-cache",
  });

  const handleViewDetails = (data) => {
    setViewDetailsData(data);
    setShowViewDetails(true);
  };

  useEffect(() => {
    if (data?.orderDetails) {
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

  return (
    <div className="py-8 h-screen overflow-y-scroll bg-litMango ">
      <h1 className="text-center text-3xl">Order</h1>
      <div className="grid grid-cols-3 gap-x-5 gap-y-5 p-5">
        {groupedOrder !== null &&
          groupedOrder.map(({ order_id, orders }, index) => {
            const mapItem = orders[0];

            return (
              <div className=" bg-white mx-auto p-1 space-y-2 h-40 w-72 overflow-y-scroll rounded-lg ">
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
                  <p
                    className={`${
                      mapItem?.order_status === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    Order status : {mapItem?.order_status}
                  </p>
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

        {showViewDetails && (
          <ShowViewDetails
            setShowViewDetails={setShowViewDetails}
            mapItem={viewDetailsData}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantOrder;
