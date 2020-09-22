import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import InputForm from './InputForm';

export default function CategoryForm() {
  const history = useHistory();
  const [category, setCategory] = useState({ name: '' });

  const handleChange = (event) => {
    event.preventDefault();
    setCategory({ name: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('api/staff/categories/', JSON.stringify(category), {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      history.push('/staff');
    } catch (error) {
      console.log(error);
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
