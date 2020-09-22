import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Form from './Form';
import InputForm from './InputForm';
import CategorySelectBox from './CategorySelectBox';

export default function ProductForm() {
  const history = useHistory();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    images: null,
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProduct((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const handleChangeCategory = (event) => {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);
    setProduct((prevstate) => {
      return { ...prevstate, ['category']: [value] };
    });
  };

  const handleImageChange = (event) => {
    console.log(event.target.files);
    setProduct({ ...product, images: event.target.files[0] });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    if (product.images) {
      formData.append('image', product.images, product.images.name);
    }
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('description', product.description);
    formData.append('category', product.category);

    try {
      const response = await axios.post('/api/staff/products/', formData, {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('access_token'),
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      });
      history.push('/staff');
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <Form submitButton="Add" handleSubmit={handleSubmit}>
      <h4>Product</h4>
      <InputForm
        name="name"
        type="text"
        labelName="Name"
        handleChange={handleChange}
        inputValue={product.name}
      />
      <InputForm
        name="price"
        type="text"
        labelName="Price"
        handleChange={handleChange}
        inputValue={product.prce}
      />
      <InputForm
        name="quantity"
        type="number"
        labelName="Quantity"
        handleChange={handleChange}
        inputValue={product.quantity}
      />
      <InputForm
        accept="image/png, image/jpeg"
        name="image"
        type="file"
        labelName="Image"
        handleChange={handleImageChange}
        inputValue={product.image}
      />
      <InputForm
        name="description"
        type="text"
        labelName="Description"
        handleChange={handleChange}
        inputValue={product.description}
      />

      <CategorySelectBox onChange={handleChangeCategory} />

      <Link className="btn-primary" to="/staff">
        Go back
      </Link>
    </Form>
  );
}
