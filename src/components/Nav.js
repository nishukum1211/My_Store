import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';



const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.clear();
    navigate('./signup');

  }
  return (
    <div>
      <img alt="logo" className="logo" src="https://www.logodesignteam.com/images/portfolio-images/ecommerce-websites-logo-design/ecommerce-websites-logo-design20.jpg" />
      
      
      { auth ? <ul className='nav-ul'>
            <li><Link to="./">Products</Link></li>
            <li><Link to="./add">Add Product</Link></li>
          
            <li><Link to="./profile">Profile</Link></li>
            <li><Link onClick={logout} to="./signup">Logout ({JSON.parse(auth).name})</Link></li>
            <li><Link to="./Wishlist">Wishlist <FontAwesomeIcon icon={faHeart} /></Link></li>
            
              
        </ul>
        :
        <ul className='nav-ul nav-right'>
        <li><Link to="./signup">Sign Up</Link></li>
        <li><Link to="./login">Login</Link></li>
        </ul>
      }
      
    </div>
  )
}

export default Nav;