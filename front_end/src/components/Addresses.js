import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "./Title";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Addresses() {
  const { addressId, setAddressId } = useContext(UserContext);

  const [addresses, setAdrresses] = useState({
    addresses: [],
    isFetching: true,
  });
  const history = useHistory();

  const changeAddress = async (event) => {
    try {
      await setAddressId(parseInt(event.target.value));
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`/api/address`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      setAdrresses({ addresses: response.data, isFetching: false });
    } catch (e) {
      console.log(e);
      setAdrresses({ adresses: addresses.adresses, isFetching: true });
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  async function handleDelete (event) {
    event.preventDefault();
    let id = event.target.value;
    try {
      const response = await axios.delete(`api/address/${id}/`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      fetchAddresses();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  const addressesGroup = () => {
    if (addresses.isFetching === true || addresses.addresses.length === 0) {
      return (
        <h3>You do not have any address, add address to make a purchase </h3>
      );
    }
    return (
      <div className="address-center">
        {addresses.addresses.map((item) => {
          return (
            <article
              key={item.address_id}
              className={
                addressId === item.address_id ? "spacing background" : "spacing"
              }
            >
              {addressId === item.address_id ? <p> Order address</p> : ""}
              <h6>Name: {item.name}</h6>
              <p>Country: {item.country}</p>
              <p>Street: {item.street}</p>
              <p>Post code: {item.post_code}</p>
              <p>City: {item.city}</p>
              <p>Phone: {item.phone}</p>
              {addressId === item.address_id ? null : (
                <button
                  className="btn-primary"
                  value={item.address_id}
                  onClick={changeAddress}
                >
                  Order addrres
                </button>
              )}

              <button
                className="btn-primary"
                value={item.address_id}
                onClick={handleDelete}
              >
                Delete
              </button>
            </article>
          );
        })}
      </div>
    );
  };
  return (
    <div className="conteiner">
      <Title title="Adrresses" />
      <section>{addressesGroup()}</section>
      <div className="seperator" />
      <Link className="btn-primary" to="/adresses-form">
        Add new address
      </Link>
    </div>
  );
}
