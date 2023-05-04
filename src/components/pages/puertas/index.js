import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { MdSensorDoor } from 'react-icons/md';
import { MdOutlineSensorDoor } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { MdLock } from 'react-icons/md';


import './puertas.css';
import Header from '../../common/Header'

function Puertas() {
    const [puertasData, setpuertasData] = useState([]);
    useEffect(() => {
        const jsonPuertas = [{"nombre":"Puerta principal","estado":false},{"nombre":"Cuarto 1","estado":true},{"nombre":"Puerta del cuarto","estado":false},{"nombre":"Mi cuarto","estado":false},{"nombre":"Puerta secundaria","estado":false},{"nombre":"Puerta traxera","estado":false},{"nombre":"Garaje","estado":true}];
        setpuertasData(jsonPuertas);
    },[]);
  
  return (
      <div className="Puertas">
        <Header/>
        <span id="title">Mis Puertas</span>
        <div id="lucescontainer">
            <NavLink activeClassName="active" to="/alerta" className="closepuertas">
                <MdLock size={35} style={{ color: "#2141df" }}/>
                <span className="text">
                    <span className="btitle">Cerrar</span>
                    <span className="bsubtitle">Todas las puertas</span>
                </span>
            </NavLink>
            <div id="luzGrid">
                {puertasData.map((puertasObj) => (
                    <div key={puertasObj.nombre} className="lucesBlock">
                    <NavLink activeClassName="active" to="/puertas/open" className={puertasObj.estado ? "lucesBotonOn" : "lucesBotonOff"}>
                    {puertasObj.estado ? (
                        <MdSensorDoor size={45} style={{ color: "c00000" }} />
                        ) : (
                        <MdOutlineSensorDoor size={45} style={{ color: "black" }} />
                        )}
                    <span className="btitle">{puertasObj.nombre}</span>
                    </NavLink>
                    <div className={puertasObj.estado ? "lucesAjustesOn" : "lucesAjustesOff"}>
                    {puertasObj.estado ? (
                        <span className="bsubtitle">Abierta</span>
                        ) : (
                        <span className="bsubtitle">Cerrada</span>
                        )}
                    </div>
                </div>
                ))}
            </div>
            <div className='addBoton'>
                <MdAdd size={42}/>
            </div>
        </div>
      </div>
  );
}

export default Puertas;