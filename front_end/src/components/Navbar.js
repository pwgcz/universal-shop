import React, { useState } from 'react';
import {FaAlignJustify} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';


export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)


  const handleToggle = () =>{
    setIsOpen(!isOpen)
  }


    return (

      <UserContext.Consumer>{(context)=>{
        const {email, userName, phone, isStaf,isActive, dateJoined, dateOfBirth} = context



        console.log({isStaf, isActive})
        return(
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
                  {isActive ? <Link to='/auth'>Logout</Link> : <Link to='/auth'>Login/Register</Link>}
                </li>
                {isActive ?
                   <li>
                      <Link to='/card'>Card</Link>
                    </li>
                    :null}
                {isStaf ?
                   <li>
                      <Link to='/staff'>Staff panel</Link>
                    </li> :null}
              </ul>

            </div>
          </nav>
        )
      }}
      </UserContext.Consumer>

    )

}
