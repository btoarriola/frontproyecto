import React from 'react';
import { useState} from 'react';
import { MdWbTwighlight } from 'react-icons/md';

import './alerta.css';
import Header from '../../common/Header'

function Alerta() {
    const [numLlamada, setNumLlamada] = useState('');
    const [numMensaje, setNumMensaje] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(numLlamada, numMensaje, mensaje);
    }
  
  return (
      <div className="Alerta">
        <Header/>
        <span id="title">Alerta</span>
        <div id="alertacontainer">
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="nota">Se llamará al número si activa el botón de alerta</p>
                    <input type="number" value={numLlamada} onChange={(e) => setNumLlamada(e.target.value)} placeholder=' Introduzca el numero de telefono'/>
                    
                </div>
                <div>
                    <p className="nota">Se enviará el mensaje si activa el botón de alerta</p>
                    <input type="number" value={numMensaje} onChange={(e) => setNumMensaje(e.target.value)} placeholder=' Introduzca el numero de telefono'/>
                </div>
                <div>
                <p className="nota">Escriba el mensaje a enviar.</p>
                    <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder='Introduzca el mensaje'/>
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