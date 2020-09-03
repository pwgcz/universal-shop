import React, { useState, useContext } from 'react';
import {FaAlignJustify} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';


export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const {user, logout} = useContext(UserContext);

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
                {user.loggedIn ?
                <div className='welcome-nav'>
                <h6>Welcome, </h6>
                <p>{user.user_name}</p>

                </div>
                  :null}
              </div>

              <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/products'>Products</Link>
                </li>

                {user.loggedIn ?
                  <>
                   <li>
                      <Link to='/cart'>Cart</Link>
                    </li>
                    <li>
                       <Link to='/profil'>Profile</Link>
                     </li>
                     </>
                    :null}
                {user.isStaff ?
                   <li>
                      <Link to='/staff'>Staff panel</Link>
                    </li> :null}
                    <li>
                    {user.loggedIn ?   <Link to='/' ><button className='btn-primary' onClick={logout}>Logout</button></Link> :
                      <Link to='/auth'><button className='btn-primary'>Login/Register</button></Link>}
                    </li>
              </ul>
            </div>

          </nav>
        )
}
