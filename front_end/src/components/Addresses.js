import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from './Title';
import { useHistory } from "react-router-dom";


export default function Addresses() {
  const [addresses, setAdrresses] = useState({addresses:[], isFetching: true});
  const history = useHistory();
  const fetchAddresses = async () => {
      try {

          const response = await axios.get(`/api/address`, {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
          }
          })

          console.log({response})
          setAdrresses({addresses: response.data, isFetching: false});
      } catch (e) {
          console.log(e);
          setAdrresses({adresses: addresses.adresses, isFetching: true});
      }
  };
  useEffect(() => {
        fetchAddresses();
    }, []);

    async function handleDelete(event) {
        event.preventDefault();
        let id = event.target.value;
        try {
            const response = await axios.delete(`api/address/${id}/`,
            {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
          });
                console.log(response);
             fetchAddresses();
            return response;

        } catch (error) {
            throw error;
        }
    }

  const addressesGroup = () =>{
    if(addresses.isFetching === true || addresses.addresses.length === 0){
      return(
         <h3>You do not have any address, add address to make a purchase </h3>
      )
    }
    return(
      <div className='address-center'>
        {addresses.addresses.map((item)=>{
          return(
           <article key={item.address_id}>
            <h6>{item.name}</h6>
            <p>{item.country}</p>
            <p>{item.street}</p>
            <p>{item.post_code}</p>
            <p>{item.city}</p>
            <p>{item.phone}</p>

            <button className='btn-primary' value={item.address_id} onClick={handleDelete}>Delete</button>
           </article>
         )
       })}
      </div>

    )

  }

  return(
  <div className='conteiner'>
      <Title title='Adrresses' />
      <section>
        {addressesGroup()}
      </section>
      <div className='seperator' />
    <Link className='btn-primary' to='/adresses-form'>Add new address</Link>
  </div>
  )
}
