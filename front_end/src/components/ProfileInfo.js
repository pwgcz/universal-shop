import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from './Title';
import {UserContext} from '../contexts/UserContext';


export default function ProfileInfo() {
    const {user} = useContext(UserContext);

    const {email, user_name, first_name, last_name, date_of_birth, phone} = user
  return(
    <>
      <div className='center-conteiner'>
          <Title title='My profile' />
          <h6>User: {user_name}</h6>
          <p>email: {email}</p>
          <p>First name:{first_name}</p>
          <p>Last name: {last_name}</p>
          <p>Birth: {date_of_birth}</p>
          <p>Phone: {phone}</p>

      </div>
      <div className='seperator'/>
  <Link className='btn-primary' to='/profile-form' >Upadate profile</Link>
  </>
  )
}
