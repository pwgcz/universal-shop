import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';


export default function Auth() {

  return(
  <div className='auth-conteiner'>
  <Login />
  <div className='auth-seperator'/>
  <Register />
  </div>
  )
}
