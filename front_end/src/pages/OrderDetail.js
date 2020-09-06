import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "../components/Title";

export default function OrderDetail(props) {
  const [order, setOrder] = useState({ orderInfo: [], oderItems: [] });

  const fetchOrderDetails = async () => {
    try {
      const ordersResponse = await axios.get(
        `/api/orders/${props.match.params.id}`
      );
      setOrder((prevstate) => {
        return { ...prevstate, orderInfo: ordersResponse.data };
      });

      const ordersItemsResponse = await axios.get(
        `/api/order-items/${props.match.params.id}`
      );
      setOrder((prevstate) => {
        return { ...prevstate, oderItems: ordersItemsResponse.data };
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (order.oderItems.length === 0) {
    return <h3>Loading....</h3>;
  }
  return (
    <>
      <Title title="Order" />
      <div className="list-conteiner">
        <p>Status: {order.orderInfo.status}</p>
        <p>Order date: {order.orderInfo.crate_date}</p>
        <p>Modified date: {order.orderInfo.modified_date}</p>
        <ul>
          {order.oderItems.map((item, index) => {
            return (
              <li key={item.order_item_id} className="list-view">
                <img src={item.product.image} alt={item.product.name} />
                <h6>{item.product.name}</h6>
                <Link
                  to={`/products/${item.product.product_id}`}
                  className="btn-primary"
                >
                  See product
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
