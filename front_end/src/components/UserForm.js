import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "./Form";
import InputForm from "./InputForm";

export default function UserForm() {
  const { user, fetchCurrentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(user);

  const history = useHistory();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserData((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.put(
        `auth/update/${user.id}/`,
        JSON.stringify(userData),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      fetchCurrentUser();
      history.push("/profil");

      return response;
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Form submitButton="Update Profile" handleSubmit={handleSubmit}>
      <h4> User Profile</h4>
      <InputForm
        name="user_name"
        type="text"
        labelName="User Name"
        handleChange={handleChange}
        inputValue={userData.user_name}
      />
      <InputForm
        name="first_name"
        type="text"
        labelName="First Name"
        handleChange={handleChange}
        inputValue={userData.first_name}
      />
      <InputForm
        name="last_name"
        type="text"
        labelName="Last Name"
        handleChange={handleChange}
        inputValue={userData.last_name}
      />
      <InputForm
        name="date_of_birth"
        type="text"
        labelName="Date of birth"
        handleChange={handleChange}
        inputValue={userData.date_of_birth}
      />
      <InputForm
        name="phone"
        type="text"
        labelName="Phone"
        handleChange={handleChange}
        inputValue={userData.phone}
      />
      <Link to="/profil" className="btn-primary">
        Go back
      </Link>
    </Form>
  );
}
