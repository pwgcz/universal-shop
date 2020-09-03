import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import Title from './Title';
import {Link} from 'react-router-dom';


export default function Orders() {

  const [orders, setOtders] = useState({orders:[], isFetching: true});
  const {user} = useContext(UserContext);



  const fetchOrders = async () => {
      try {

          const response = await axios.get(`/api/orders/`, {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
          }
          })
          console.log(response.data);
          setOtders({orders: response.data, isFetching: false});
      } catch (e) {
          console.log(e);
          setOtders({orders: orders.orders, isFetching: true});
      }
  };
  useEffect(() => {
        fetchOrders();
    }, []);

    return(
      <>
      </>
    )

}
