import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paginator from '../components/Paginator';

export default function StaffProducts () {

  const [orders, setOrders] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `/api/staff/orders?page=${activePage}`
      );
      setOrders(response.data);
      setCount(response.data.length);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [activePage]);

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
      <Paginator activePage={activePage} count={count} handlePageChange={handlePageChange} />
    </>
  );

}
