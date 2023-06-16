import React from 'react';
import { useState} from "react";
import Login from './login';
import Singup from './singup.js';

function IndexLogin() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? <Login /> : <Singup />}
      <p>
        {showLogin ? "¿No tienes cuenta? Regístrate  " : "¿Ya tienes cuenta?   "}
        <button onClick={toggleComponent}>
          {showLogin ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>
    </div>
  );
}

export default IndexLogin;
