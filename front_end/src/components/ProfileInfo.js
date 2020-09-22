import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "./Title";
import { UserContext } from "../contexts/UserContext";
import RowInList from './RowInList';

export default function ProfileInfo() {
  const { user } = useContext(UserContext);

  const {
    email,
    user_name,
    first_name,
    last_name,
    phone,
    date_of_birth,
  } = user;
  return (
    <>
      <Title title="My profile" />
      <div className="profile-conteiner">
        <h6>
          <RowInList isInline title='User:' content={user_name} />
        </h6>
        <RowInList isInline title='email:' content={email} />
        <RowInList isInline title='First name:' content={last_name} />
        <RowInList isInline title='Last name:' content={date_of_birth} />
        <RowInList isInline title='Phone:' content={phone} />
      </div>
      <div className="seperator" />
      <Link className="btn-primary btn-margin" to="/profile-form">
        Upadate profile
      </Link>
    </>
  );
}
