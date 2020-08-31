import React, { useState } from 'react';
import authorizationAxios from '../axiosApi'

export default function Register() {

const [user, setUser] = useState({phone:'', password:'', secondPassword:'', userEmail:'', userName:''})

  const handleChange = (event) =>{
    event.preventDefault();
    const {name, value} = event.target
    setUser(prevstate=>{
      return {...prevstate, [name]: value}
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await authorizationAxios.post('api_auth/users',
          JSON.stringify(user)
        );
        return response;
    } catch (error) {
         console.log(error.stack);
    }
}
console.log({user})

    return (
      <form className='auth-form' onSubmit={handleSubmit}>
          <h4>Register</h4>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <label htmlFor="secondPassword">Repeat Password</label>
          <input
            type="password"
            name="secondPassword"
            value={user.secondPassword}
            onChange={handleChange}

          />

          <label htmlFor="email">*Email</label>
          <input
            type="email"
            name="email"
            value={user.userEmail}
            onChange={handleChange}
          />

          <label htmlFor="email">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />

          <button type="submit" className='btn-primary'> Register </button>
        </form>
    )

}
