import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowLeft} from 'react-icons/md';
import './new.css';
import Header from '../../../common/Header';
import apic from '../../../../services/api';

function LucesNew() {
    const [form, setForm] = useState({
        nombre: ''
      });
    
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
        console.log(form);
      };
    
      const newluz = async () => {
        console.log("holaa nueva luz");
        const jsonluz = {
          "nombre": form.nombre,
          "estado": true,
          "brillo": 50,
          "programar": null,
          "color": "rgb(255, 255, 255)"
        };
        try {
          const user = await apic.post('/luces/', jsonluz);
          console.log(user.usuario);
        } catch (error) {
          console.error('Error al obtener las usuario:', error);
        }
      };      
      console.log("acutal",form);

  return (
    <div className="LucesNew">
      <Header />
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink activeClassName="active" to="/luces" className="returnboton">
          <MdKeyboardArrowLeft size={40} style={{ color: "#2141df", marginTop:7 }} />
        </NavLink>
        <span id="title">Nueva luz</span>
      </div>
      <div id="lucescontainer">
        <label>nombre</label>
        <input type="text" name="nombre" onChange={handleChange} />

        <button onClick={newluz}>Iniciar sesión</button>
      </div>
    </div>
  );
}

export default LucesNew;
