import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';


export default function Auth() {



const handleLogout = () => {
  localStorage.removeItem('token');
};

  return(
  <div className='auth-conteiner'>
  <Login />
  <div className='auth-seperator'/>
  <Register />
  </div>
  )
}
