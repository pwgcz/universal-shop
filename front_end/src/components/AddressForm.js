import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from './Form';
import InputForm from './InputForm';
import { useAlert } from 'react-alert';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function AddressForm() {
  const [addressData, setAddressData] = useState({
    name: '',
    country: '',
    street: '',
    post_code: '',
    city: '',
    phone: '',
  });
  const { user } = useContext(UserContext);
  const history = useHistory();
  const alerts = useAlert();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAddressData((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const handleChangePhone = (value) => {
    setAddressData((prevstate) => {
      return { ...prevstate, ['phone']: value };
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(
        '/api/address/',
        JSON.stringify({ ...addressData, users: [parseInt(user.id)] }),
        {
          headers: {
            Authorization: 'JWT ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        }
      );
      history.push('/profil');
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        alerts.show('Invalid information', {
          timeout: 0,
          type: 'error',
        });
      } else if (error.response.status === 401) {
        alerts.show('you must be login', {
          timeout: 0,
          type: 'error',
        });
      }
    }
  }

  return (
    <Form submitButton="Add new" name="Category" handleSubmit={handleSubmit}>
      <h4> Addresses</h4>
      <InputForm
        name="name"
        type="text"
        labelName="Name"
        handleChange={handleChange}
        value={addressData.name}
      />
      <InputForm
        name="country"
        type="text"
        labelName="Country"
        handleChange={handleChange}
        value={addressData.country}
      />
      <InputForm
        name="street"
        type="text"
        labelName="Street"
        handleChange={handleChange}
        value={addressData.street}
      />
      <InputForm
        name="post_code"
        type="text"
        labelName="Post code"
        handleChange={handleChange}
        value={addressData.post_code}
      />
      <InputForm
        name="city"
        type="text"
        labelName="City"
        handleChange={handleChange}
        value={addressData.city}
      />

      <label htmlFor="phone">Phone</label>
      <PhoneInput
        containerClass="phone-conteiner"
        inputClass="phone-input"
        buttonClass="phone-button"
        name="phone"
        value={addressData.phone}
        onChange={handleChangePhone}
        placeholder=" "
      />

      <Link className="btn-primary" to="/profil">
        Go back
      </Link>
    </Form>
  );
}
