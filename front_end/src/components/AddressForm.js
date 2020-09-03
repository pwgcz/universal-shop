import React, { useState, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AddressForm() {

const [addressData, setAddressData] = useState({name:'', country:'', street:'', post_code:'', city:'', phone:'' })
const {user} = useContext(UserContext);
const history = useHistory();

const handleChange = (event) =>{
  event.preventDefault();
  const {name, value} = event.target
  setAddressData(prevstate=>{
    return {...prevstate, [name]: value}
  })
}


async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await axios.post('api/address/',JSON.stringify({...addressData, users: [parseInt(user.id)]}) ,
        {
        headers: {
            'Authorization': "JWT " + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
      });
        history.push("/profil");
        return response;

    } catch (error) {
        throw error;
    }
}

    return (
        <div className='container'>
          <form className='form-container' onSubmit={handleSubmit}>
              <h4> Addresses</h4>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={addressData.name}
                onChange={handleChange}
              />

              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                value={addressData.country}
                onChange={handleChange}
              />

              <label htmlFor="street">Street</label>
              <input
                type="text"
                name="street"
                value={addressData.street}
                onChange={handleChange}
              />
              <label htmlFor="post_code">Post code</label>
              <input
                type="text"
                name="post_code"
                value={addressData.post_code}
                onChange={handleChange}
              />
              <label htmlFor="password">City</label>
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={handleChange}
              />
              <label htmlFor="password">Phone</label>
              <input
                type="text"
                name="phone"
                value={addressData.phone}
                onChange={handleChange}
              />
              <button type="submit" className='btn-primary'> add </button>
              <button className='btn-primary'><Link to='/profil'>Go back</Link></button>
          </form>
        </div>

    )

}
