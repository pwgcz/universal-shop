import React, { useState, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function UserForm() {
const {user} = useContext(UserContext);
const [userData, setUserData] = useState(user)

const history = useHistory();
// TODO: isue: after submit user lost token  
const handleChange = (event) =>{
  event.preventDefault();
  const {name, value} = event.target
  setUserData(prevstate=>{
    return {...prevstate, [name]: value}
  })
}
async function handleSubmit() {

    try {
        const response = await axios.put(`auth/update/${user.id}/`,JSON.stringify(userData) ,
        {
        headers: {
            'Authorization': "JWT " + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
      });

            console.log(response);
        return response;

    } catch (error) {
        throw error;
    }
}
    return (
      <div className='container'>
          <form className='form-container' onSubmit={handleSubmit}>
              <h4>User Profile</h4>

              <label htmlFor="user_name">User Name</label>
              <input
                type="text"
                name="user_name"
                value={userData.user_name}
                onChange={handleChange}
              />

              <label htmlFor="first_name">First name</label>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
              />

              <label htmlFor="last_name">Last name</label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
              />
              <label htmlFor="date_of_birth">Date of birth</label>
              <input
                type="text"
                name="date_of_birth"
                value={userData.date_of_birth}
                onChange={handleChange}
              />
              <label htmlFor="email">Enmail</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <label htmlFor="password">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
              <button type="submit" className='btn-primary'> update </button>
              <button className='btn-primary'><Link to='/profil'>Go back</Link></button>
          </form>

        </div>
    )

}
