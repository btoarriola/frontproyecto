import React, { useState } from 'react';
import './usuario.css';
import apic from '../../../services/api';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
function Forma(props) {
  const [actUsuario, setActUsuario] = useState({
    telefono: cookie.get('telefonousuario'),
    direccion: cookie.get('direccion')
  });
  

  const aceptSubmit = (e) => {
    e.preventDefault();
    console.log(actUsuario);
    //Aqui se enviará al api
    props.setIsOpen(false);
  };

  const cancelSubmit = (e) => {
    e.preventDefault();
    props.setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getData = async () => {
    
  };

  return (
    <div className="menu">
      <div style={{ margin: '18px 14px', display: 'flex', alignItems: 'center' }}>
        <span className="mtitle">Editar perfil</span>
        <button className="botonaceptar" onClick={cancelSubmit} style={{ marginRight: '3.5vw' }}>
          Cerrar
        </button>
        <button className="botonaceptar" onClick={aceptSubmit} style={{ backgroundColor: '#2141df', color: 'white' }}>
          Aceptar
        </button>
      </div>
      <div className="formcontainer">
        <div>
          <p className="nota">Telefono Celular</p>
          <input type="number" name="telefono" value={actUsuario.telefono} onChange={handleChange} />
        </div>
        <div>
          <p className="nota">Direccion</p>
          <input type="text" name="direccion" value={actUsuario.direccion} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default Forma;
