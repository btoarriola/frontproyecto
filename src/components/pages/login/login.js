import React, { useState, useEffect } from 'react';
import apic from '../../../services/api';
import Cookies from 'universal-cookie';
import './component.css';

const cookie = new Cookies();
function Login() {
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

  const iniciarSesion = async ()=>{
    console.log("holaa inicio sesion");
    try{
        const data={correo: form.email,contraseña: form.password}
        console.log(data);
        const user = await apic.post('/usuarios/login/', data);
        var usuario = user.usuario;
        console.log(usuario);
        if(usuario.correo===form.email && usuario.contraseña===form.password ){
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
        console.error('Error al obtener las usuario:', error);
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
      <p id="title">LogIn</p>
      <label>Correo</label>
      <input type="email" name="email" onChange={handleChange} className="input"/>
      <label>Contraseña</label>
      <input type="password" name="password" onChange={handleChange} className="input"/>

      <button onClick={iniciarSesion} className="button">Iniciar sesión</button>
    </div>
  );
}

export default Login;
