import React from 'react';
import { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { MdAirlineSeatIndividualSuite } from 'react-icons/md';
import { MdEditSquare } from 'react-icons/md';
import { MdWbIncandescent } from 'react-icons/md';
import { MdPerson } from 'react-icons/md';


import userimg from '../../../assets/img/userimg.jpeg';
import './usuario.css';
import Header from '../../common/Header'
import Forma from './form.js';
function Usuario() {
    
    const [usuario] = useState({
        nombre: "Casa de betoarriola",
        email: 'betokanon@gmail.com',
        telefono: 2722607274,
        direccion: "Av principal no 8 col principal",
        hab: 4
      });
    
      const [isOpen, setIsOpen] = useState(false);
    
      const handleButtonClick = (e) => {
        setIsOpen(!isOpen);
        e.stopPropagation();
      };
    
      const handleFormSubmit = () => {
        setIsOpen(false);
      };

  return (
      <div className="Usuario">
        <Header/>
        {isOpen && (
        <Forma
          usuario={usuario}
          setIsOpen={setIsOpen}
          handleFormSubmit={handleFormSubmit}
        />
      )}
        <div className="usuariocontainer">
            <div className='imgcontainer'>
                <img src={userimg} id='userimg' alt='userimg'/>
                <span id='nombreusuario'>{usuario.nombre}</span>
            </div>
            <div className='userinfo' style={{margin: '10px', marginTop: '3vh'}}>
                <p className='subtitule'>Correo electronico</p>
                <p className='contenido'>{usuario.email}</p>
                <p className='subtitule'>Telefono celular</p>
                <p className='contenido'>{usuario.telefono}</p>
                <p className='subtitule'>Direccion</p>
                <p className='contenido'>{usuario.direccion}</p>
            </div>

            <div className="controlbutton">
                <div className="conbuttoncontainer">
                    <NavLink activeClassName="active" to="/alerta" className="conbuttonsbig">
                        <MdAirlineSeatIndividualSuite size={36} style={{ color: "#000" }}/>
                        <span className="btitle">Habitaciones</span>
                        <span className="bsubtitle">{usuario.hab} habitaciones</span>
                    </NavLink>
                    <NavLink activeClassName="active" to="/alerta" className="conbuttonssmall">
                        <MdWbIncandescent size={36} style={{ color: "#000" }}/>
                        <span className="text">
                            <span className="btitle">Dispositivos</span>
                            <span className="bsubtitle"> conectados</span>
                        </span>
                    </NavLink>
                </div>
                <div className="conbuttoncontainer">
                    <NavLink activeClassName="active" onClick={handleButtonClick} className="conbuttonssmall">
                        <MdPerson size={42} style={{ color: "#000", marginBottom:'-8', marginTop:'-8' }}/>
                        <span className="text">
                            <span className="btitle">Editar</span>
                            <span className="bsubtitle">Editar perfil</span>
                        </span>
                    </NavLink>
                    <NavLink activeClassName="active" to="/usuario/editcasa" className="conbuttonsbig">
                        <MdEditSquare size={36} style={{ color: "#000" }}/>
                        <span className="btitle">Casa</span>
                        <span className="bsubtitle">Rediseña tu casa</span>
                    </NavLink>
                </div>
            </div>
            
        </div>
      </div>
  );
}

export default Usuario;