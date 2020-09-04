import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';


export default function StaffPage() {


  return(  <div className='list-conteiner'>
    <Title title='Category' />
      <Link to='/category-form' className='btn-primary '>Add</Link>
    <Title title='product' />
      <Link to='/product-form' className='btn-primary '>Add</Link>

    <Title title='Orders' />
    </div>
  )
}
