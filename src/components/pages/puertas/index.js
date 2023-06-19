import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { MdSensorDoor } from 'react-icons/md';
import { MdOutlineSensorDoor } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import apic from '../../../services/api';
import './puertas.css';
import Header from '../../common/Header';
import Navbar from '../../common/Navbar';
import Cookies from "universal-cookie";

const cookie = new Cookies();
function Puertas() {
    const [puertas, setPuertas] = useState([]);

  useEffect(() => {
    fetchLuces();
    if (!cookie.get("id")) {
      window.location.href = "./";
    }
  }, []);

  const fetchLuces = async () => {
    try {
      const lucesData = await apic.get('/puertas/');
      setPuertas(lucesData);
      console.log("Respuesta de la API:", lucesData);
    } catch (error) {
      console.error('Error al obtener las puertas:', error);
    }
  };

  
  return (
      <div className="Puertas">
        <Header/>
        <Navbar />
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
                {puertas.map((puertasObj) => (
                    <div key={puertasObj.nombre} className="lucesBlock">
                    <NavLink activeClassName="active" to={`/puertas/open/${puertasObj._id}`} className={puertasObj.estado ? "lucesBotonOn" : "lucesBotonOff"}>
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
            <NavLink activeClassName="active" to="/puertas/new" className="puertasNew">
              <div className="addBoton">
            <MdAdd size={42} />
          </div>
        </NavLink>
        </div>
      </div>
  );
}

export default Puertas;