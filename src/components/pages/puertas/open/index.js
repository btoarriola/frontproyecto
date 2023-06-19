import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { NavLink, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Header from '../../../common/Header';
import './puertasOpen.css';
import apic from "../../../../services/api";
import Cookies from "universal-cookie";
import mqtt from 'mqtt-browser';

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
  const shouldRenderControls = puertaData.nombre !== undefined;
  // ----------------------------- conexion con mqtt -----------------------------------------
  //const client = mqttConnection();
  const client = mqtt.connect("ws://localhost:8083/mqtt"); //ws://192.168.1.81:8083/mqtt
  client.on("connect", () => {
    if(shouldRenderControls){
      const nombretopic = puertaData.nombre.toLowerCase().replace(/\s/g, "");
      client.subscribe(`domotica/puerta/${nombretopic}`, (err) => {
        if (err) {console.error("Error al suscribirse al topic de domotica/luz/sala:",err);} 
        else {console.log("!!Suscripción exitosa al topic domotica/puerta/");}
      });
  }
  });


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
    const brokerdata = {
      id: id,
      nombre: puertaData.nombre,
      estado: !puertaData.estado,
    };

    if(shouldRenderControls){
      console.log("DATA ", brokerdata);
      const nombreFormateado = puertaData.nombre.toLowerCase().replace(/\s/g, "");
      console.log("Identificar ",nombreFormateado);
      client.publish(`domotica/puerta/${nombreFormateado}`, brokerdata.toString(), (error) => {
        if (error) {
          console.error('Error al publicar el mensaje:', error);
        } else {
          console.log(`>>>>>> publicado correctamente a ${nombreFormateado}  :`,brokerdata);
        }
      });
    }

    const captura = webcamRef.current.getScreenshot();
    setImagen(captura);

    setTimeout(() => {
      client.end(); // Cerrar la conexión MQTT al desmontar el componente
      window.location.href = "/puertas";
    }, 1000);
  };

  useEffect(() => {
    //conexion MQTT
    client.on("message", (topic, message) => {
      console.log("Mensaje recibido en el topic ",topic,":",message.toString());
    });

    

  }, [client]);

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
