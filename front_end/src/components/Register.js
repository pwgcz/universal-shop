import React, { useState } from 'react';


export default function Register() {

  const [password, setPassword] = useState()
  const [userEmail, setUserEmail] = useState()

  const handle_change = e => {

        const name = e.target.name;
        const value = e.target.value;

      };


    return (
      <form >
          <h4>Sign Up</h4>
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
          <input type="submit" />
        </form>
    )

}
