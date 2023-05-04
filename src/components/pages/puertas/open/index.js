import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { NavLink} from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Header from '../../../common/Header';
import './puertasOpen.css';

function PuertasOpen() {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);

  const alto='100%';
  const tomarFoto = () => {
    const captura = webcamRef.current.getScreenshot();
    console.log(captura);
    setImagen(captura);
  };

  return (
    <div className="PuertasOpen">
      <Header />
      <div style={{display: 'flex', alignItems: 'center', marginBottom:'5%'}}>
          <NavLink activeClassName="active" to="/puertas" className="returnboton">
            <MdKeyboardArrowLeft size={'5vh'} style={{ color: "#2141df" }}/>
          </NavLink>
          <span id="title">Regresar</span>
        </div>
      <div>
        <div style={{display:'flex',justifyContent:'center' }}>
            <div style={{borderRadius: '15px', width: '90%', display:'flex', alignItems:'center', justifyContent:'center', height:'70vh',overflow: 'hidden'}}>
                <Webcam
                audio={false}
                height={alto}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                
                />
            </div>
        </div>
        <br />
        <div style={{display:'flex',justifyContent:'center' }}>
            <div onClick={tomarFoto} className='fotoboton'>Capturar</div>
        </div>
        
        <div style={{display:'flex',justifyContent:'center' }}>
            <div style={{borderRadius: '15px', width: '90%', display:'flex', alignItems:'center', justifyContent:'center', height:'70vh',overflow: 'hidden'}}>
            {imagen && <img src={imagen} alt="Capturada" />}
            </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default PuertasOpen;
