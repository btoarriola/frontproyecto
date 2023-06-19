import React from 'react';
import { useState} from "react";
import Login from './login';
import Singup from './singup.js';
import './loginindex.css';
import logo4 from '../../../assets/img/logo4.png'
import logo5 from '../../../assets/img/logo5.png'

function IndexLogin() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className='loginIndex'>
      
        <img src={logo4} alt="logo" className='logologin'/>
        <img src={logo5} alt="logo" className='letraslogin'/>
      
      <p style={{display:'block', magin:'15px'}}>
        {showLogin ? "¿No tienes cuenta? Regístrate  " : "¿Ya tienes cuenta?   "}
        <button onClick={toggleComponent}>
          {showLogin ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>
      {showLogin ? <Login /> : <Singup />}
    </div>
  );
}

export default IndexLogin;
