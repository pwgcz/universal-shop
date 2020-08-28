import React, { useState } from 'react';
import authorizationAxios from '../axiosApi'

export default function Login() {

const [password, setPassword] = useState()
const [userEmail, setUserEmail] = useState()


const  handleChange = (event) => {
  console.log(event.target.name)
  if (event.target.name==='password'){
    setPassword(event.target.value);
  }else if(event.target.name==='email')
    setUserEmail(event.target.value);
}

async function handleSubmit(event) {
    event.preventDefault();
    try {
        const data = await authorizationAxios.post('/token-auth', {
            email: userEmail,
            password: password

        });
        authorizationAxios.defaults.headers['Authorization'] = "JWT " + data.access;
        localStorage.setItem('access_token', data.access);
        return data;
    } catch (error) {
        throw error;
    }
}

    return (
      <form className='auth-form' onSubmit={handleSubmit}>
              <h4>Log In</h4>

              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={userEmail}
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <button type="submit" className='btn-primary'> Log in </button>

            </form>
    )

}
