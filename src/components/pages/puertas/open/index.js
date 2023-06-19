import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { NavLink, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Header from '../../../common/Header';
import './puertasOpen.css';
import apic from "../../../../services/api";
import Cookies from "universal-cookie";

const cookie = new Cookies();
function PuertasOpen() {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);
  const alto='100%';

  const { id } = useParams(); // id
  const [puertaData, setPuertaData] = useState({});

  useEffect(() => {
    if (!cookie.get("id")) {
      window.location.href = "./";
    }
    // --------------GET a la API --------------
    const getData = async () => {
      try {
        const getpuerta = await apic.get('/puertas/' + id);
        setPuertaData({
          nombre: getpuerta.puerta.nombre,
          estado: getpuerta.puerta.estado,
        });

      } catch (error) {
        console.error('Error al obtener los datos de luces:', error);
      }
    };
    getData();
  },[id]);

  const tomarFoto = async () => {
    setPuertaData(prevData => ({
      ...prevData,
      estado: !prevData.estado
    }));
    //Aqui hacer el publish a weebcokets
    await apic.put('/puertas/'+id, {
      id: id,
      nombre: puertaData.nombre,
      estado: !puertaData.estado
    });

    const captura = webcamRef.current.getScreenshot();
    setImagen(captura);

    setTimeout(() => {
      window.location.href = "/puertas";
    }, 900);
  };
  console.log(puertaData);
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
        <div onClick={tomarFoto} className='fotoboton'></div>
        
        {imagen && 
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'rgba(0, 0, 0, 0.500)' }}>
              <div className='banner'>  
                <span style={{color:'#2141df', fontWeight:'600', fontSize:'19px', letterSpacing:'0.7px'}}>Analizando</span>
                <div style={{borderRadius: '15px', width: '70%', display:'flex', alignItems:'center', justifyContent:'center', height:'40vh',overflow: 'hidden'}}>
                  <img src={imagen} alt="Capturada" height= '100%' />
                </div>
              </div>
          </div>
        }
      </div>
    </div>
  );
}

export default PuertasOpen;
