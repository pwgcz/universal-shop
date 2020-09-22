import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import RowInList from '../components/RowInList';

export default function OrderDetail (props) {
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
    } catch (error) {
      console.log(error);
    }
  };
  console.log(order);
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const currencyFormater = (param) => {
    return new Intl.NumberFormat("pl",{
      style:'currency',
      minimumIntegerDigits:1,
      currency: 'PLN',
      currencyDisplay: 'symbol'
    }).format(param);
  }

  const dateTimeFormater = (param) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(param))
  }
  let totalPrice = 0;
  if (order.oderItems.length === 0) {
    return <h3>There is no Order.</h3>;
  }
  return (
    <div className='wrapper'>
      <Title title="Order" />
      <div className="list-conteiner">
        <div className='list-view'>
          <RowInList title='Status:' content={order.orderInfo.status} />
          <RowInList title='Order date:' content={dateTimeFormater(order.orderInfo.crate_date)} />
          <RowInList title='Modified date:' content={dateTimeFormater(order.orderInfo.modified_date)} />
        </div>
        <Title title="Ordered products" />
        <ul>
          {order.oderItems.map((item, index) => {
            totalPrice =+ item.quantity * item.product.price
            return (
              <li key={item.order_item_id} className="list-view">
                <img src={item.product.image} alt={item.product.name} />
                <RowInList title='Name:' content={item.product.name} />
                <RowInList title='Quantity:' content={item.quantity} />
                <RowInList title='price:' content={`${item.product.price} zł`} />

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
        <h3>summary</h3>
        <RowInList title='Total price:' content={currencyFormater(totalPrice)} />
        <Title title="Shipping address" />
        <div className='list-view'>
          <RowInList title='Name:' content={order.orderInfo.addresses.name} />
          <RowInList title='Country:' content={order.orderInfo.addresses.country} />
          <RowInList title='City:' content={order.orderInfo.addresses.city} />
          <RowInList title='Post Code:' content={order.orderInfo.addresses.post_code} />
          <RowInList title='Street:' content={order.orderInfo.addresses.street} />
        </div>
      </div>
    </div>
  );
}
