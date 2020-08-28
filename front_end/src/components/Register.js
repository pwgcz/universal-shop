import React, { useState } from 'react';


export default function Register() {

  const [password, setPassword] = useState()
  const [userEmail, setUserEmail] = useState()

  const handle_change = e => {

        const name = e.target.name;
        const value = e.target.value;

      };


    return (
      <form className='auth-form'>
          <h4>Register</h4>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userEmail}
            onChange={handle_change}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handle_change}
          />

          <label htmlFor="password">Repeat Password</label>
          <input
            type="password"
            name="password"

          />

          <label htmlFor="password">Email</label>
          <input
            type="email"
            name="email"
          />

          <button type="submit" className='btn-primary'> Register </button>
        </form>
    )

}
