import React from 'react';
import { NavLink} from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import './Header.css';
import logo2 from '../../assets/img/logo2.png';

function Header() {
  return (
    <nav class="header">
        <img src={logo2} alt="logo" className='logo'/>
        <NavLink activeClassName="active" to="/perfil" className="icon">
        <MdMenu size={40}/>
        </NavLink>
    </nav>
  );
}

export default Header;
