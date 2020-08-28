import React, { useState } from 'react';
import authorizationAxios from '../axiosApi'

export default function Register() {

  const [password, setPassword] = useState()
  const [secondPassword, setSecondPassword] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userName, setUserName] = useState()


  const handle_change = event => {

    console.log(event.target.name)
    if (event.target.name==='password'){
      setPassword(event.target.value);
    }else if(event.target.name==='email')
      setUserEmail(event.target.value);
    else if(event.target.name==='secondPassword'){
      setSecondPassword(event.target.value);
    }else if(event.target.name==='username'){
      setUserName(event.target.value)
    }
      };

    async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await authorizationAxios.post('/users', {
            username: userName,
            email: userEmail,
            password: password
        });
        return response;
    } catch (error) {
         console.log(error.stack);
    }
}


    return (
      <form className='auth-form' onSubmit={handleSubmit}>
          <h4>Register</h4>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userName}
            onChange={handle_change}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handle_change}
          />

          <label htmlFor="secondPassword">Repeat Password</label>
          <input
            type="password"
            name="secondPassword"
            value={secondPassword}
            onChange={handle_change}

          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userEmail}
            onChange={handle_change}
          />

          <button type="submit" className='btn-primary'> Register </button>
        </form>
    )

}
