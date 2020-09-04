import React, {useEffect, useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import Title from './Title';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default function Form({children, submitButton, handleSubmit, name}) {


    return(
      <>
        <div className='container'>
      <form className='form-container' onSubmit={handleSubmit} >
        {children}
      <button type="submit" className='btn-primary'> {submitButton} </button>
      </form>
      </div>
      </>
    )

}
