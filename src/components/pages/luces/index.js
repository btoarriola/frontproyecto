import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdLightbulb, MdLightbulbOutline, MdKeyboardArrowRight, MdAdd } from 'react-icons/md';
import './luces.css';
import Header from '../../common/Header';
import Navbar from '../../common/Navbar';
import apic from '../../../services/api';
import Cookies from "universal-cookie";

const cookie = new Cookies();
function Luces() {
  const [luces, setLuces] = useState([]);

  useEffect(() => {
    fetchLuces();
    if (!cookie.get("id")) {
      window.location.href = "./";
    }
  }, []);
  /*
  agregar un message para nuevas luces 
  */

  const fetchLuces = async () => {
    try {
      const lucesData = await apic.get('/luces/');
      setLuces(lucesData.luces);
      console.log("Respuesta de la API:", lucesData);
    } catch (error) {
      console.error('Error al obtener las luces:', error);
    }
  };

  return (
    <div className="Luces">
      <Header />
      <Navbar />
      <span id="title">Mis Luces</span>
      <div id="lucescontainer">
        <div id="luzGrid">
          {luces.map((lucesObj) => (
            <div key={lucesObj._id} className="lucesBlock">
              <NavLink activeClassName="active" to="/luces" className={lucesObj.estado ? "lucesBotonOn" : "lucesBotonOff"}>
                {lucesObj.estado ? (
                  <MdLightbulb size={45} style={{ color: "#f69200" }} />
                ) : (
                  <MdLightbulbOutline size={45} style={{ color: "black" }} />
                )}
                <span className="btitle">{lucesObj.nombre}</span>
              </NavLink>
              <NavLink activeClassName="active" to={`/luces/edit/${lucesObj._id}`} className="lucesAjustes">
                <span className="bsubtitle">{lucesObj.brillo}%</span>
                <MdKeyboardArrowRight size={20} style={{ color: "#2141df" }} />
              </NavLink>
            </div>
          ))}
        </div>
        <NavLink activeClassName="active" to="/luces/new" className="lucesNew">
          <div className="addBoton">
            <MdAdd size={42} />
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Luces;
