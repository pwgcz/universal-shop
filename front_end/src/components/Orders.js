import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "./Title";
import { Link } from "react-router-dom";
import Paginator from '../components/Paginator';
import RowInList from './RowInList';

export default function Orders () {
  const [orders, setOtders] = useState({ orders: [], isFetching: true });
  const [activePage, setActivePage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders?page=${activePage}`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      setOtders({ orders: response.data, isFetching: false });
      setCount(response.data.length);
    } catch (e) {
      console.log(e);
      setOtders({ orders: orders.orders, isFetching: true });
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [activePage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }
  const dateTimeFormater = (param) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(param))
  }
  if (orders.orders.length === 0) {
    return (
      <>
        <Title title="My orders" />
        <h3> You do not had any orders</h3>
      </>
    );
  }
  return (
    <>
      <Title title="My orders" />
      <div className="list-conteiner">
        <ul>
          {orders.orders.map((item, index) => {
            return (
              <li key={item.order_id} className="list-view">
                <RowInList title='Ordered:' content={dateTimeFormater(item.crate_date)} />
                <RowInList title='Modified:' content={dateTimeFormater(item.modified_date)} />
                <RowInList title='Status:' content={item.status} />
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
