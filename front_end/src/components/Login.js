import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import InputForm from "./InputForm";
import axios from 'axios';

export default function Login() {
  const [userLog, setUserLog] = useState({ email: "", password: "" });
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserLog((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await axios.post(
        "/token-auth/",
        JSON.stringify(userLog),{
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          }
        }
      );
      axios.defaults.headers["Authorization"] =
        "JWT " + data.data.token;
      localStorage.setItem("access_token", data.data.token);
      setUser(data.data.user);
      history.push("/profil");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h4>Log In</h4>

      <label htmlFor="email">Email</label>
      <input
        className = 'start-input'
        type="text"
        name="email"
        value={userLog.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        className = 'start-input'
        type="password"
        name="password"
        value={userLog.password}
        onChange={handleChange}
      />
      <button type="submit" className="btn-primary">
        {" "}
        Log in{" "}
      </button>
    </form>
  );
}
