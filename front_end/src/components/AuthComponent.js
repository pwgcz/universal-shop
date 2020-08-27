import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import axios from 'axios';



export default function Auth() {

  const [islogIn, setIsLogIn]=useState(false);
  const [displayedForm, setDisplayedForm]=useState('');
  const [userEmail, setUserEmail]=useState('');



  const handleLogin = (e, data) => {
    e.preventDefault();
    async function getUser() {
    try {
    const response = await axios.post('/token-auth',
     {
       data: JSON.stringify(data)
      },
      {
      headers: {
        'Content-Type': 'application/json'
      },
      });
    setIsLogIn(true)
    setDisplayedForm()
    setUserEmail(response.email)
    console.log(response);
    }catch (error) {
      console.error(error);
    }}
  };

  const handleRegister = (e, data) => {
    e.preventDefault();
    async function getUser() {
    try {
    const response = await axios.post('/users/',
     {
       data: JSON.stringify(data)
      },
      {
      headers: {
        'Content-Type': 'application/json'
      },
      });
    setIsLogIn(true)
    setDisplayedForm()
    setUserEmail(response.email)
    console.log(response);
    }catch (error) {
      console.error(error);
    }}
  };



const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLogIn(false)
  setUserEmail('')
};

  return(
  <>
  <Login />
  <Register />
  </>
  )
}
