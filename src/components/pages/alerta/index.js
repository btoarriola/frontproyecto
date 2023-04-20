import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { MdLightbulb } from 'react-icons/md';
import { MdLightbulbOutline } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Boton from '../../../assets/img/botonalerta.svg';

import './alerta.css';
import Header from '../../common/Header'

function Alerta() {
    const [puertasData, setpuertasData] = useState([]);
    useEffect(() => {
        const jsonluces = [{"nombre":"cocina","estado":false,"brillo":0},{"nombre":"dormitorio","estado":true,"brillo":100},{"nombre":"Mesa de estudio","estado":false,"brillo":0},{"nombre":"Cuarto 2","estado":false,"brillo":0},{"nombre":"Sala","estado":false,"brillo":50},{"nombre":"Garaje","estado":true,"brillo":60},{"nombre":"Cuarto invitados","estado":true,"brillo":73},{"nombre":"Comedor","estado":true,"brillo":84},{"nombre":"Exterior","estado":true,"brillo":100}];
        setpuertasData(jsonluces);
    },[]);
  
  return (
      <div className="Alerta">
        <Header/>
        <span id="title">Alerta</span>
        <div id="alertacontainer">
            <div className='botonalerta'>
                <Boton/>
            </div>
        </div>
      </div>
  );
}

export default Alerta;