import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paginator from '../components/Paginator';
import StatusOrderSelectcBox from './StatusOrderSelectcBox';

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
    } catch (error) {
      console.log(error);
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
  const dateTimeFormater = (param) => {
    console.log(new Date(param))
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date(param))
  }
  return (
    <>
      <div className="list-conteiner">
        <ul>
          {orders.map((item, index) => {
            return (
              <li key={item.order_id} className="list-view">
                <p>Ordered: {dateTimeFormater(item.crate_date)}</p>
                <p>Modified: {dateTimeFormater(item.modified_date)}</p>
                <StatusOrderSelectcBox orderId={item.order_id} fetchOrders={fetchOrders} currentValue={item.status} />
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
