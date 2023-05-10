import React from 'react';
import { useState } from 'react';
import { MdWbTwighlight } from 'react-icons/md';

import './alerta.css';
import Header from '../../common/Header'

function Alerta() {
  const [formData, setFormData] = useState({
    numLlamada: '',
    numMensaje: '',
    mensaje: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  return (
    <div className="Alerta">
      <Header/>
      <span id="title">Alerta</span>
      <div id="alertacontainer">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="nota">Se llamará al número si activa el botón de alerta</p>
            <input type="number" name="numLlamada" value={formData.numLlamada} onChange={handleChange} placeholder=' Introduzca el numero de telefono'/>
          </div>
          <div>
            <p className="nota">Se enviará el mensaje si activa el botón de alerta</p>
            <input type="number" name="numMensaje" value={formData.numMensaje} onChange={handleChange} placeholder=' Introduzca el numero de telefono'/>
          </div>
          <div>
            <p className="nota">Escriba el mensaje a enviar.</p>
            <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder='Introduzca el mensaje'/>
          </div>
          <button type="submit" className='botonaplicar'>Aplicar</button>
        </form>

        <div className='botoncontainer'>
          <MdWbTwighlight size={110} id="iconboton"/>
        </div>
      </div>
    </div>
  );
}

export default Alerta;
