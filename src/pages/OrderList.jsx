import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderList = () => {
  const { id } = useParams();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios.get(`/orders/get-orders?userId=${id}`).then(res => setOrderList(res.data));
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-2xl py-10 md:py-20">
      <h1 className="text-center text-2xl md:text-4xl">Order List</h1>
      <div>
        {orderList.map(list => {
          return (
            <div
              key={list._id}
              className="p-4 border rounded-md mb-6 last-of-type:mb-0 first-of-type:mt-6"
            >
              <h2>Order ID: {list._id}</h2>
              <p>Total Price: {list.totalAmount}</p>
              <p>Order Date: {list.orderDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
