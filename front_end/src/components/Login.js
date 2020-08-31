import React, { useState, useContext } from 'react';
import authorizationAxios from '../axiosApi'
import {UserContext} from '../contexts/UserContext';

export default function Login() {

const [userLog, setUserLog] = useState({email:'', password:''})
const {user, setUser} = useContext(UserContext);


const handleChange = (event) =>{
  event.preventDefault();
  const {name, value} = event.target
  setUserLog(prevstate=>{
    return {...prevstate, [name]: value}
  })
}
console.log(user)

// TODO: move to navbar
// const handleLogout = () => {
//   localStorage.removeItem('token');
//   setLogedIn(false);
// };

async function handleSubmit(event) {
    event.preventDefault();
    try {
        const data = await authorizationAxios.post('/token-auth/', JSON.stringify(userLog));
        authorizationAxios.defaults.headers['Authorization'] = "JWT " + data.data.token;
        localStorage.setItem('access_token', data.data.token);
        setUser.setLogedIn(true);
        return data.data;
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
                value={userLog.email}
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={userLog.password}
                onChange={handleChange}
              />
              <button type="submit" className='btn-primary'> Log in </button>
          </form>

    )

}
