import React from 'react';
import { NavLink} from 'react-router-dom';
import './Navbar.css';
import {MdHome} from 'react-icons/md';
import { MdLightbulb } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import { MdWbTwighlight } from 'react-icons/md';
import { MdSensorDoor } from 'react-icons/md';

function Navbar() {
  
  return (
    <nav class="nav">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/alerta">
            <MdWbTwighlight size={32}  />
            <span>Alerta</span>
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/puertas">
            <MdSensorDoor size={29}  style={{marginTop: '3px', marginBottom: '2px'}}/>
            <span>Puertas</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/">
            <MdHome size={32}  />
            <span>Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/luces">
            <MdLightbulb size={30}  />
            <span>Luces</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/perfil">
            <MdAccountCircle size={30}  />
            <span>Usuario</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
