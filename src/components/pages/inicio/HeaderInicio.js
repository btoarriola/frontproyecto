import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink} from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import './HeaderInicio.css';
import logo1 from '../../../assets/img/logo3.png';
import logo2 from '../../../assets/img/logo2.png';

function HeaderInicio() {
    const [headerTransparent, setHeaderTransparent] = useState(true);
    const [logo, setLogo] = useState(logo1);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 40) {
                setHeaderTransparent(false);
                setLogo(logo2);
            } else {
                setHeaderTransparent(true);
                setLogo(logo1);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerStyle = {
        backgroundColor: headerTransparent ? 'transparent' : '#ffffff',
        boxShadow: headerTransparent ? 'none':'0px 0px 15px 6px rgba(0, 0, 0, 0.35)',
        transition: 'background-color 0.3s ease-in-out',
    };
    const icon = {
        color: headerTransparent ? '#fff' : '#333',
        transition: 'background-color 0.3s ease-in-out',
    };
  
  return (
    <nav class="header" style={headerStyle}>
        <img src={logo} alt="logo" className='logo'/>
        <NavLink activeClassName="active" to="/perfil" className="icon" style={icon}>
        <MdMenu size={40}/>
        </NavLink>
    </nav>
  );
}

export default HeaderInicio;
