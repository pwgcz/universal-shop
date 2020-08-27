import React, { useState } from 'react';
import {FaAlignJustify} from 'react-icons/fa';
import {Link} from 'react-router-dom';


export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)


  const handleToggle = () =>{
    setIsOpen(!isOpen)
  }


    return (
      <nav className='navbar'>
        <div className='nav-center'>
          <div className='nav-header '>
          <button type='button' className='nav-btn' onClick={handleToggle}>
            <FaAlignJustify />
          </button>
            <Link to='/'>
              <h3>Berry Shop</h3>
            </Link>
          </div>

          <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
            <li>
              <Link to='/auth'>Login/Register</Link>
            </li>
          </ul>

        </div>
      </nav>
    )

}
