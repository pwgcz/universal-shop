import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import ImageBackground from '../components/ImageBackground';


export default function Auth () {
  return (
    <ImageBackground>
      <div className="auth-conteiner">
        <Login />
        <div className="auth-seperator" />
        <Register />
      </div>
    </ImageBackground>
  );
}
