import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "./Title";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import InputForm from "./InputForm";

export default function ProductFormUpdate (props) {
  const history = useHistory();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    quantity: '',
    images: '',
    description: ''
  });

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `/api/products/${props.match.params.id}`
      );
      console.log(response.data);
      setProduct({
        name: response.data.name,
        price: response.data.price,
        category: response.data.category,
        quantity: response.data.quantity,
        description: response.data.description
      })
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProduct((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const handleImageChange = (event) => {
    console.log(event.target.files);
    setProduct({...product, images:event.target.files[0]});

  };

  async function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();


    if (product.images) {
      formData.append('image', product.images, product.images.name);
    }
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('description', product.description);
    formData.append('category', product.category);

    console.log(formData);

    try {
      const response = await axios.post(
        "/api/staff/products/",
        formData,
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("access_token"),
            "Content-Type": 'multipart/form-data',
            accept: "application/json",
          },
        }
      );
      history.push("/staff");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form submitButton="Update" handleSubmit={handleSubmit}>
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
        inputValue={product.price}
      />
      <InputForm
        name="quantity"
        type="text"
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
      <InputForm
        name="category"
        type="text"
        labelName="Category"
        handleChange={handleChange}
        inputValue={product.category}
      />
      <Link className="btn-primary" to="/staff">
        Go back
      </Link>
    </Form>
  );
}
