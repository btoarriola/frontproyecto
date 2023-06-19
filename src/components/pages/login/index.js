import React from 'react';
import { useState} from "react";
import Login from './login';
import Singup from './singup.js';
import './login.css';
import logo4 from '../../../assets/img/logo4.png'
import logo5 from '../../../assets/img/logo5.png'

function IndexLogin() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className='loginIndex'>
      <div className='logocontainer'>
        <img src={logo4} alt="logo" className='logologin'/>
        <img src={logo5} alt="logo" className='letraslogin'/>
      </div>
      {showLogin ? <Singup />: <Login /> }
      <p style={{display:'block', magin:'15px'}}>
        {showLogin ? "¿Ya tienes cuenta?   ": "¿No tienes cuenta?  " }
        <span onClick={toggleComponent}>
          {showLogin ? "Inicia sesión" : "Regístrate"}
        </span>
      </p>
    </div>
  );
}

export default IndexLogin;
