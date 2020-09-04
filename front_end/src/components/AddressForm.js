import React, { useState, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Form from './Form';
import InputForm from './InputForm';

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

      <Form submitButton='Add new category' name='Category' handleSubmit={handleSubmit} >
       <h4> Addresses</h4>
        <InputForm name='name' type='text' labelName='Name' handleChange={handleChange} value={addressData.name} />
        <InputForm name='country' type='text' labelName='Country' handleChange={handleChange} value={addressData.country} />
        <InputForm name='street' type='text' labelName='Street' handleChange={handleChange} value={addressData.street} />
        <InputForm name='post_code' type='text' labelName='Post code' handleChange={handleChange} value={addressData.post_code} />
        <InputForm name='city' type='text' labelName='City' handleChange={handleChange} value={addressData.city} />
        <InputForm name='phone' type='text' labelName='Phone' handleChange={handleChange} value={addressData.phone} />
        <Link className='btn-primary' to='/profil'>Go back</Link>
      </Form>
    )

}
