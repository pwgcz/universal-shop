import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StaffProducts () {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `/api/staff/orders/`
      );
      setOrders(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="error">
        <h3>No matches to given parameters</h3>
      </div>
    );
  }


  return (
    <>
      <div className="list-conteiner">
        <ul>
          {orders.map((item, index) => {
            return (
              <li key={item.order_id} className="list-view">
                <p>Ordered: {item.crate_date}</p>
                <p>Modified: {item.modified_date}</p>
                <p>Status: {item.status}</p>
                <Link
                  to={`/order-detail/${item.order_id}`}
                  className="btn-primary"
                >
                  Ditails
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="seperator" />
    </>
  );

}
