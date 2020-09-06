import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "./Title";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Form from "./Form";
import InputForm from "./InputForm";

export default function CategoryForm() {
  const history = useHistory();
  const [category, setCategory] = useState({ name: "" });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCategory((prevstate) => {
      return { [name]: value };
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "api/categories/",
        JSON.stringify(category),
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      history.push("/staff");
      return response;
    } catch (error) {
      throw error;
    }
  }

  return (
    <Form submitButton="Add" handleSubmit={handleSubmit}>
      <h4>Category</h4>
      <InputForm
        name="category"
        type="text"
        labelName="Category"
        handleChange={handleChange}
        inputValue={category.name}
      />
      <Link className="btn-primary" to="/staff">
        Go back
      </Link>
    </Form>
  );
}
