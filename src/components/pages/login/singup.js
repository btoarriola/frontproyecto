import React, { useState, useEffect } from 'react';
import apic from '../../../services/api';
import Cookies from 'universal-cookie';
import './component.css';

const cookie = new Cookies();
function Singup() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form);
  };

  const registro = async ()=>{
    console.log("holaa registro");
    try{
        const data={nombre: form.nombre,correo: form.email,contraseña: form.password}
        console.log(data);
        const user = await apic.post('/usuarios/', data);
        var usuario = user.usuario;
        console.log(usuario);
        if(usuario && usuario._id){
            console.log("bienvenido")
            cookie.set('id',usuario._id,{path:"/"});
            cookie.set('nombre',usuario.nombre,{path:"/"});
            cookie.set('correo',usuario.correo,{path:"/"});
            cookie.set('telefono',usuario.telefono,{path:"/"});
            console.log(cookie.get('id'));
            window.location.href="./home";

        }else{
            alert("Usuario o contraseña ivalido")
        }
    }catch (error) {
        console.error('Error al registrar:', error);
      }
  };

  useEffect(() => {
    if (cookie.get('id')) {
      alert("ya estas logeado");
      window.location.href = "./home";
    }
  }, []);
 
  console.log("acutal",form);
  return (
    <div className="component">
      <p id="title">SingUp</p>
      <label>Nombre</label>
      <input type="text" name="nombre" onChange={handleChange} className="input"/>
      <label>Correo</label>
      <input type="email" name="email" onChange={handleChange} className="input"/>
      <label>Contraseña</label>
      <input type="password" name="password" onChange={handleChange} className="input"/>

      <button onClick={registro} className="button">Regístrate</button>
    </div>
  );
}

export default Singup;
