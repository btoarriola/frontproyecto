import React, { useState } from 'react';
import apic from '../../../services/api';
import Cookies from 'universal-cookie';

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
        const user = await apic.get('/usuario/', {params: {email: form.email, password: form.password}})
        console.log(user.usuario);
        if(user.usuario>0){
            var usuario = user.usuario;
            cookie.set('id',usuario.id,{path:"/"});
            cookie.set('nombre',usuario.nombre,{path:"/"});
            cookie.set('correo',usuario.email,{path:"/"});
            cookie.set('telefono',usuario.telefono,{path:"/"});

        }else{
            alert("Usuario o contraseña ivalido")
        }
    }catch (error) {
        console.error('Error al obtener las usuario:', error);
      }
  };

  console.log("acutal",form);
  return (
    <div className="loginClass">
      <label>Correo</label>
      <input type="text" name="email" onChange={handleChange} />
      <label>Contraseña</label>
      <input type="password" name="password" onChange={handleChange} />

      <button onClick={iniciarSesion}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
