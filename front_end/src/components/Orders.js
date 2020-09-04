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


    if(orders.orders.length === 0){
      return(<>
        <Title title='My orders' />
        <h3> You do not had any orders</h3>
        </>
      )
    }
    return(
      <>
      <Title title='My orders' />
      <div className='list-conteiner'>
      <ul>
      {orders.orders.map((item, index)=>{
        return(
         <li key={item.order_id} className='list-view'>
          <p>Ordered: {item.crate_date}</p>
          <p>Modified: {item.modified_date}</p>
          <p>Status: {item.status}</p>
          <Link to={`/order-detail/${item.order_id}`} className="btn-primary">Ditails</Link>
         </li>
       )
      })}
      </ul>
      </div>
      <div className='seperator'/>
      </>
    )

}
