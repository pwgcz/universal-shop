import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';



export default function Auth() {


  return(
  <>
  <div className='auth-conteiner'>
  <Login />
  <div className='auth-seperator'/>
  <Register />
  </div>
  </>
  )
}
