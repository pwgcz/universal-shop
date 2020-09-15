import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'

export default function Cart() {
  const [cartItems, setCartItems] = useState({ cart: [0], isFetching: true });
  const { user, addressId } = useContext(UserContext);
  const history = useHistory();
  const alerts = useAlert();


  const makeOrder = async () => {
    try {
      const response = await axios.post(
        "api/orders/",
        JSON.stringify({
          users: [parseInt(user.id)],
          addresses: [addressId],
        }),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      console.log(
        JSON.stringify(
          cartItems.cart.map((item) => {
            return {
              order: response.data.order_id,
              product: parseInt(item.product.product_id),
            };
          })
        )
      );
      await axios.post(
        "api/order-items/",
        JSON.stringify(
          cartItems.cart.map((item) => {
            return {
              order: response.data.order_id,
              product: parseInt(item.product.product_id),
            };
          })
        ),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      await axios.delete("api/cart-items/", {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      history.push("/profil");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        alerts.show('choose adresses to make order on your profile site', {
          timeout: 0,
          type: 'info'
        })
      }
    }
  };
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart-items`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      setCartItems({ cart: response.data, isFetching: false });
    } catch (e) {
      console.log(e);
      setCartItems({ cart: cartItems.cart, isFetching: true });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  async function handleDelete(event) {
    event.preventDefault();
    let id = event.target.value;
    try {
      const response = await axios.delete(`api/cart-items/${id}/`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      fetchCartItems();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const productGroup = () => {
    if (cartItems.isFetching) {
      return <h3> Cart is feaching...</h3>;
    } else if (cartItems.cart.length === 0) {
      return (
        <>
          <h3> Your cart is empty</h3>
          <Link to="/products" className="btn-primary">
            {" "}
            Back to shoping{" "}
          </Link>
        </>
      );
    }
    return (
      <>
        <ul>
          {cartItems.cart.map((item, index) => {
            return (
              <li key={item.cart_item_id} className="list-view">
                <img src={item.product.image} alt={item.product.name} />
                <h6>{item.product.name}</h6>
                <button
                  onClick={handleDelete}
                  value={item.cart_item_id}
                  className="btn-primary"
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={makeOrder} className="btn-primary">
          Buy
        </button>
      </>
    );
  };

  return (
    <>
      <Title title="Cart" />
      <div className="list-conteiner">{productGroup()}</div>
    </>
  );
}
