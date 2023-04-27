import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { MdLightbulb } from 'react-icons/md';
import { MdLightbulbOutline } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';

import './luces.css';
import Header from '../../common/Header'

function Luces() {
    const [lucesData, setlucesData] = useState([]);
    useEffect(() => {
        const jsonluces = [{"nombre":"cocina","estado":false,"brillo":0},{"nombre":"dormitorio","estado":true,"brillo":100},{"nombre":"Mesa de estudio","estado":false,"brillo":0},{"nombre":"Cuarto 2","estado":false,"brillo":0},{"nombre":"Sala","estado":false,"brillo":50},{"nombre":"Garaje","estado":true,"brillo":60},{"nombre":"Cuarto invitados","estado":true,"brillo":73},{"nombre":"Comedor","estado":true,"brillo":84},{"nombre":"Exterior","estado":true,"brillo":100}];
        setlucesData(jsonluces);
    },[]);
  
  return (
      <div className="Luces">
        <Header/>
        <span id="title">Mis Luces</span>
        <div id="lucescontainer">
            <div id="luzGrid">
                {lucesData.map((lucesObj) => (
                    <div key={lucesObj.nombre} className="lucesBlock">
                        <NavLink activeClassName="active" to="/luces" className={lucesObj.estado ? "lucesBotonOn" : "lucesBotonOff"}>
                        {lucesObj.estado ? (
                            <MdLightbulb size={45} style={{ color: "f69200" }} />
                            ) : (
                            <MdLightbulbOutline size={45} style={{ color: "black" }} />
                            )}
                        <span className="btitle">{lucesObj.nombre}</span>
                        </NavLink>
                        <NavLink activeClassName="active" to="/luces/edit" className="lucesAjustes">
                            <span className="bsubtitle">{lucesObj.brillo}%</span>
                            <MdKeyboardArrowRight size={20} style={{ color: "#2141df" }} />
                        </NavLink>
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

export default Luces;