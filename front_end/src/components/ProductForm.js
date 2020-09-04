import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from './Title';
import { useHistory } from "react-router-dom";
import Form from './Form';
import InputForm from './InputForm';


export default function ProductForm() {

  const history = useHistory();
  const [product, setProduct] = useState({name:'', prce:'', quantity:'', image:'', description:'', category:''})

  const handleChange = (event) =>{
    event.preventDefault();
    const {name, value} = event.target
    setProduct(prevstate=>{
      return {...prevstate, [name]: value}
    })
  }

  async function handleSubmit(event) {
      event.preventDefault();
      try {
          const response = await axios.post('api/products/',JSON.stringify(product) ,
          {
          headers: {
              'Authorization': "JWT " + localStorage.getItem('access_token'),
              'Content-Type': 'application/json',
              'accept': 'application/json'
          }
        });
          history.push("/staff");
          return response;

      } catch (error) {
          throw error;
      }
  }

  return(
    <Form submitButton='Add'  handleSubmit={handleSubmit} >
    <h4>Product</h4>
      <InputForm name='name' type='text' labelName='Name' handleChange={handleChange} inputValue={product.name} />
      <InputForm name='prce' type='text' labelName='Price' handleChange={handleChange} inputValue={product.prce} />
      <InputForm name='quantity' type='text' labelName='Quantity' handleChange={handleChange} inputValue={product.quantity} />
      <InputForm name='image' type='text' labelName='Image' handleChange={handleChange} inputValue={product.image} />
      <InputForm name='description' type='text' labelName='Description' handleChange={handleChange} inputValue={product.description} />
      <InputForm name='category' type='text' labelName='Category' handleChange={handleChange} inputValue={product.category} />
      <Link className='btn-primary' to='/staff'>Go back</Link>
    </Form>
  )
}
