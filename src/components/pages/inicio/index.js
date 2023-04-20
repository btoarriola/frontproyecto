import React from 'react';
import { NavLink} from 'react-router-dom';
import { MdLightbulb } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import { MdAccessAlarm } from 'react-icons/md';
import { MdWbTwighlight } from 'react-icons/md';
import { MdSensorDoor } from 'react-icons/md';
import { MdAirlineSeatIndividualSuite } from 'react-icons/md';
import { MdEditSquare } from 'react-icons/md';

import './inicio.css';
import houseimg from '../../../assets/img/house.png';
import HeaderInicio from './HeaderInicio';

function Inicio() {
    const cantluces= 3;
  
  return (
      <div className="Inicio">
        <HeaderInicio/>
        <span id="title">Mi Casa</span>
        <div id="housecontainer">
            <img src={houseimg} alt="houseimg" />
        </div>
        <span id="subtitle">Seguridad en casa</span>
        <div id="lateralbuttons">
            <NavLink activeClassName="active" to="/luces" className="latbuttons">
                <MdLightbulb size={34} style={{ color: "#f69200" }}/>
                <span className="text">
                    <span className="btitle">Luces</span>
                    <span className="bsubtitle">{cantluces} encendida</span>
                </span>
            </NavLink>
            <NavLink activeClassName="active" to="/alerta" className="latbuttons">
                <MdLock size={30} style={{ color: "#c00000" }}/>
                <span className="text">
                    <span className="btitle">Puertas</span>
                    <span className="bsubtitle">{cantluces} abiertas</span>
                </span>
            </NavLink>
            <NavLink activeClassName="active" to="/alerta" className="latbuttons">
                <MdAccessAlarm size={36} style={{ color: "#2141df" }}/>
                <span className="text">
                    <span className="btitle">Programar</span>
                    <span className="bsubtitle">luces</span>
                </span>
            </NavLink>
        </div>
        <span id="subtitle">Toma el control</span>
        <div id="controlbutton">
            <div className="conbuttoncontainer">
                <NavLink activeClassName="active" to="/alerta" className="conbuttonsbig">
                    <MdWbTwighlight size={36} style={{ color: "#000" }}/>
                    <span className="btitle">Botón de alerta</span>
                    <span className="bsubtitle">Presiona para llamar</span>
                </NavLink>
                <NavLink activeClassName="active" to="/alerta" className="conbuttonssmall">
                    <MdAirlineSeatIndividualSuite size={36} style={{ color: "#000" }}/>
                    <span className="text">
                        <span className="btitle">Habitaciones</span>
                        <span className="bsubtitle">{cantluces} habitaciones</span>
                    </span>
                </NavLink>
            </div>
            <div className="conbuttoncontainer">
                <NavLink activeClassName="active" to="/alerta" className="conbuttonssmall">
                    <MdSensorDoor size={36} style={{ color: "#000" }}/>
                    <span className="text">
                        <span className="btitle">Cerrar</span>
                        <span className="bsubtitle">Todas las puertas</span>
                    </span>
                </NavLink>
                <NavLink activeClassName="active" to="/alerta" className="conbuttonsbig">
                    <MdEditSquare size={36} style={{ color: "#000" }}/>
                    <span className="btitle">Edicion</span>
                    <span className="bsubtitle">Rediseña tu casa</span>
                </NavLink>
            </div>
        </div>
      </div>
  );
}

export default Inicio;