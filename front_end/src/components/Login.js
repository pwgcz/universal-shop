import React, { useState } from 'react';


export default function Login() {

const [password, setPassword] = useState()
const [userEmail, setUserEmail] = useState()

const handle_change = e => {

      const name = e.target.name;
      const value = e.target.value;

        // setState(prevstate => {
        // const newState = { ...prevstate };
        // newState[name] = value;
        // return newState;

      // });
    };

    return (
      <form className='auth-form' onSubmit={e => this.props.handle_login(e, {password, userEmail})}>
              <h4>Log In</h4>

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
              <button type="submit" className='btn-primary'> Log in </button>

            </form>
    )

}
