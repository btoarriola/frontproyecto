import React, { useEffect, useState } from 'react';
import { MdMenu, MdLogout } from 'react-icons/md';
import './HeaderInicio.css';
import logo1 from '../../../assets/img/logo3.png';
import logo2 from '../../../assets/img/logo2.png';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
function HeaderInicio() {
  const [headerTransparent, setHeaderTransparent] = useState(true);
  const [logo, setLogo] = useState(logo1);
  const [panelVisible, setPanelVisible] = useState(false);

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
    boxShadow: headerTransparent ? 'none' : '0px 0px 15px 6px rgba(0, 0, 0, 0.35)',
    transition: 'background-color 0.3s ease-in-out',
  };

  const iconStyle = {
    color: headerTransparent ? '#fff' : '#333',
    transition: 'background-color 0.3s ease-in-out',
  };

  const panel= {
    position: 'fixed',
    top: '54px', /* Ajusta la posición vertical según tus necesidades */
    right: '0px', /* Ajusta la posición horizontal según tus necesidades */
    border: '0px solid',
    padding: '10px',
    height:'100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(2px)',
    boxShadow: '-23px 0px 20px -16px rgba(0,0,0,0.75)',
  }

  const handleIconClick = () => {
    setPanelVisible(!panelVisible);
  };

  const handleCerrarSesion = () => {
    cookie.remove('id',{path:"/"});
    cookie.remove('nombre',{path:"/"});
    cookie.remove('correo',{path:"/"});
    cookie.remove('telefono',{path:"/"});
    alert("sesion cerrada");
    window.location.href='./';
  };

  return (
    <nav className="header" style={headerStyle}>
      <img src={logo} alt="logo" className="logo" />

      <MdMenu size={40} className="icon" style={iconStyle} onClick={handleIconClick} />

      {panelVisible && (
        <div className="panel" style={panel}>
          <button onClick={handleCerrarSesion} style={{backgroundColor:'white', border:'none', fontSize:15, marginTop:'12px', padding:'8px 7px', }}> 
            <MdLogout size={18}/> Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default HeaderInicio;
