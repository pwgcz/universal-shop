import React, { useState } from "react";
import axios from "axios";
import classnames from 'classnames';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert'
import CSRFToken from './CSRFToken';

export default function Register () {
  const alerts = useAlert();

  const [user, setUser] = useState({
    phone: "",
    password: "",
    email: "",
    user_name: "",
  });

  const [userErr, setUserErr] = useState({
    phoneErr: "",
    passwordErr: "",
    secondPasswordErr: "",
    userEmailErr: "",
    userNameErr: "",
  });

const [secondPassword, setSecondPassword] = useState("");

  const emailRegExp = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const paswordRegExp = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  );

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    switch (name) {
      case 'user_name':
        setUser((prevstate) => {
          return { ...prevstate, [name]: value };
        });
        setUserErr((pravestate) => {
          return { ...pravestate, ['userNameErr'] : value.length < 3 ? 'at least 3 character' : '' };
        })
        break;

      case 'password':
        setUser((prevstate) => {
          return { ...prevstate, [name]: value };
        });
        setUserErr((pravestate) => {
          return { ...pravestate, ['passwordErr'] : !paswordRegExp.test(value) ? 'password is not valid' : '' };
        })
        break;

      case 'secondPassword':
        setSecondPassword(value)
        setUserErr((pravestate) => {
          return { ...pravestate, ['secondPasswordErr'] : value !== user.password ? 'Password do not mach' : '' };
        })
        break;

      case 'email':
        setUser((prevstate) => {
          return { ...prevstate, [name]: value };
        });
        setUserErr((pravestate) => {
          return { ...pravestate, ['userEmailErr'] : !emailRegExp.test(value) ? ' Invalid Email' : '' };
        })
        break;

      case 'phone':
        setUser((prevstate) => {
          return { ...prevstate, [name]: value };
        });
        setUserErr((pravestate) => {
          return { ...pravestate, ['phoneErr'] : value.length !== 9 ? 'Invalid phone number' : '' };
        })
        break;
      default:
        break;
    }

  };

  const checkIsInvalid = (value) => {
    return value !== '' ;
  }
  const checkIsEmpty = (value) => {
    return value === '' ;
  }

  const csrftoken = Cookies.get('csrftoken');
  async function handleSubmit (event) {
    event.preventDefault();

    if (!Object.values(userErr).some(checkIsInvalid) && !Object.values(user).some(checkIsEmpty)) {
      try {
        await axios.post(
          `auth/users/`,
          JSON.stringify(user), {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              'X-CSRFToken': csrftoken
            },
          });
        setUser({
          phone: "",
          password: "",
          email: "",
          user_name: "",
        })
        setSecondPassword('')
        alerts.show('user created successfully', {
          timeout: 0,
          type: 'success'
        })
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 500) {
          alerts.show('user with this email exist', {
            timeout: 0,
            type: 'error'
          })
        }

      }
    }else{
      alerts.show('Invalid Register Form', {
        timeout: 0,
        type: 'error'
      })
    }

  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <CSRFToken />
      <h4>Register</h4>
      <label htmlFor="user_name">Username</label>
      <input
        className={classnames('start-input', { 'is-invalid': userErr.userNameErr, 'is-valid': !userErr.userNameErr && user.user_name.length })}
        type="text"
        name="user_name"
        value={user.user_name}
        onChange={handleChange}
      />
      <small className='invalid'>{userErr.userNameErr}</small>


      <label htmlFor="password">Password</label>
      <input
        className={classnames('start-input', { 'is-invalid': userErr.passwordErr, 'is-valid': !userErr.passwordErr && user.password.length })}
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <small className='invalid'>{userErr.passwordErr}</small>

      <label htmlFor="secondPassword">Repeat Password</label>
      <input
        className={classnames('start-input', { 'is-invalid': userErr.secondPasswordErr, 'is-valid': !userErr.secondPasswordErr && secondPassword.length })}
        type="password"
        name="secondPassword"
        value={secondPassword}
        onChange={handleChange}
      />
      <small className='invalid'>{userErr.secondPasswordErr}</small>

      <label htmlFor="email">Email</label>
      <input
        className={classnames('start-input', { 'is-invalid': userErr.userNameErr, 'is-valid': !userErr.userEmailErr && user.email.length })}
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <small className='invalid'>{userErr.userEmailErr}</small>

      <label htmlFor="phone">Phone</label>
      <input
        className={classnames('start-input', { 'is-invalid': userErr.phoneErr, 'is-valid': !userErr.phoneErr && user.phone.length })}
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        pattern="[0-9]{9}"
      />
      <small className='invalid'>{userErr.phoneErr}</small>

      <button type="submit" className="btn-primary">
        {" "}
        Register{" "}
      </button>
      <small>
        <h3>Password must contein:</h3>
        <p>at least 8 character</p>
        <p>one uppercase character</p>
        <p>one lowercase character</p>
      </small>
    </form>
  );
}
