import React from "react";
import Toggle from "react-toggle";
import { Slider } from "@mui/material";
import "react-toggle/style.css";
import { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineWbSunny, MdSunny, MdBrightnessAuto, MdBrightnessHigh,MdBrightnessLow } from "react-icons/md";
import colores from "../../../../assets/img/colores.png";

import "./edit.css";
import Header from "../../../common/Header";
import mqtt from "mqtt-browser";
import apic from "../../../../services/api";
function LucesEdit() {
  // ----------------------------- conexion con mqtt -----------------------------------------

  const client = mqtt.connect("ws://192.168.1.81:8083/mqtt"); //ws://192.168.1.81:8083/mqtt
  client.on("connect", () => {
    console.log("Conectado al broker");
    client.subscribe("domotica/luz/on-off", (err) => {
      if (err) {
        console.error("Error al suscribirse al topic de encendido/apagado:",err);
      } else {
        console.log("Suscripción exitosa al topic de on-off");
      }
    });

    client.subscribe("domotica/luz/brillo", (err) => {
      if (err) {
        console.error("Error al suscribirse al topic de brillo:", err);
      } else {
        console.log("Suscripción exitosa al topic de brillo");
      }
    });

    client.subscribe("domotica/luz/color", (err) => {
      if (err) {
        console.error("Error al suscribirse al topic de color:", err);
      } else {
        console.log("Suscripción exitosa al topic de color");
      }
    });
  });

  //---------------------------- declaracion de varibles ---------------------------------

  const { id } = useParams(); // id
  const [luzjson, setLuzjson] = useState({});  //json que recibe el post
  const [lucesData, setlucesData] = useState({});
  const [estado, setEstado] = useState(); //Este es para el  ESTADO tonggle switch
  const [brillo, setBrillo] = useState(); //Este para el  BRILLO slider
  const [showValue, setShowValue] = useState(false); // mostrar valor o no
  const [color, setColor] = useState(); //Est es para el seleccionador de COLOR
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 }); //circulo de colores
  const imgRef = useRef(null);
  

  // ----------------------------------POST a la API -----------------------
  const fetchData = async () => {
    console.log("Dentro de fetchData");
    try {
      const luzis = await apic.get('/luces/' + id);
      console.log("el json de la luz", luzis.luz);
      setLuzjson(luzis.luz);
      setlucesData({
        nombre: luzis.luz.nombre,
        estado: luzis.luz.estado,
        brillo: luzis.luz.brillo,
        programar: luzis.luz.programar,
        color: luzis.luz.color,
      });

      

    } catch (error) {
      console.error('Error al obtener los datos de luces:', error);
    }
  };


  //-------------------------------------- Metodo y funciones  --------------------------------------------

    //Encendido y apagado de las luces
    const handleToggle = () => {
      if(estado === false){
        setEstado(true);
        console.log("Encendiendo la luz", estado);
        client.publish("domotica/luz/on-off", "true");
      }
      else if (estado === true){
        setEstado(false);
        console.log("Apagando la luz", estado);
        client.publish("domotica/luz/on-off", "false");
      }
      console.log(estado);
    };
  
      //Intensidad de la luz
    const handleChange = (event, newValue) => {
      setBrillo(newValue);
      console.log(brillo);
      console.log("Cambiando el brillo:", brillo);
      client.publish("domotica/luz/brillo", brillo.toString(), (err) => {
        if (err) {
          console.error("Error al enviar el mensaje al broker:", err);
        } else {
          console.log("Mensaje enviado al broker correctamente");
        }
      });
      setShowValue(true);
    };
  
    const handleMouseUp = () => {
      setShowValue(false);
    };
  
      //Est es para el seleccionador de color
    function handleColorPicker(e) {
      const canvas = document.createElement("canvas");
      const img = imgRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const pixelData = ctx.getImageData(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY,
        1,
        1
      ).data;
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      setColor(color);
      const pixelPos = getPixelPosition(
        ctx,
        img.width,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      setCirclePosition({ x: pixelPos.x, y: pixelPos.y });
      
      console.log("Cambiando el brillo:", color);
      client.publish("domotica/luz/color", color.toString());
    }
  
    function handleColorSelect(botonColor) {
      setColor(botonColor);
      const canvas = document.createElement("canvas");
      const img = imgRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
  
      // Obtener la posición del pixel correspondiente al color seleccionado
      const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;
      let pixelPos = null;
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const index = (y * img.width + x) * 4;
          const color = `rgb(${pixelData[index]}, ${pixelData[index + 1]}, ${
            pixelData[index + 2]
          })`;
          if (color === botonColor) {
            pixelPos = getPixelPosition(ctx, img.width, x, y);
            break;
          }
        }
        if (pixelPos) {
          break;
        }
      }
  
      if (pixelPos) {
        setCirclePosition({ x: pixelPos.x, y: pixelPos.y });
      }
    }
  
    function getPixelPosition(ctx, imgWidth, x, y) {
      const index = (y * imgWidth + x) * 4;
      const data = ctx.getImageData(0, 0, imgWidth, imgWidth).data;
      return {
        x: x,
        y: y,
        index: index,
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3],
      };
    }
  
    function handleWhiteColorSelect() {
      setColor("rgb(255, 255, 255)");
      setCirclePosition({
        x: "48%",
        y: "45%",
      });
    }



  
  useEffect(() => {

    fetchData();
    //conexion MQTT
    client.on("message", (topic, message) => {
      console.log("Mensaje recibido en el topic ",topic,":",message.toString());

      if (topic === "domotica/luz/on-off") {
        const estadoLuz = JSON.parse(message.toString()).estado;
        setEstado(!estadoLuz);
        console.log("La luz se encuentra:", estadoLuz);
      }

      if (topic === "domotica/luz/brillo") {
        const nuevoBrillo = parseInt(message.toString());
        if (isNaN(nuevoBrillo)) {
          console.error("Valor de brillo inválido:", message.toString());
          return;
        }
        setBrillo(nuevoBrillo);
        console.log("El brillo actual es:", nuevoBrillo);
        //Aqui se actualiza el valor del brillo actualizarRangoBrillo();
      }
    });
    console.log("DESDE useefect estado ", estado, " brillo", brillo, " color ", color);

    return () => {
      client.end(); // Cerrar la conexión MQTT al desmontar el componente
    };
    

  }, [estado, brillo, color]);

  return (
    <div className="LucesEdit">
      <Header />
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink activeClassName="active" to="/luces" className="returnboton">
          <MdKeyboardArrowLeft size={40} style={{ color: "#2141df" }} />
        </NavLink>
        <span id="title">{lucesData.nombre}</span>
      </div>
      <div id="controlcontainer">
        <div className="controlluces">
          <span className="btitle">Estado</span>
          <Toggle
            defaultChecked={estado}
            onChange={handleToggle}
            icons={false}
            className="my-toggle-class"
          />
        </div>
        <div className="controlluces" id="programarContainer">
          <span className="text">
            <span className="btitle">Programar</span>
            <span className="bsubtitle">encendido y apagado</span>
          </span>
          <NavLink
            activeClassName="active"
            to="/luces"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span className="bsubtitle">{lucesData.programar}</span>
            <MdKeyboardArrowRight size={30} style={{ color: "#fff" }} />
          </NavLink>
        </div>
      </div>

      <div id="luceseditcontainer">
        <div id="brillocontrolcontainer">
          <span className="btitle">Brillo</span>
          <div id="slider">
            <Slider
              orientation="vertical"
              value={brillo}
              onChange={handleChange}
              onMouseUp={handleMouseUp}
              aria-labelledby="continuous-slider"
              sx={{
                color: "white",
                borderRadius: 5,
                height: "100%",
                "& .MuiSlider-thumb": {
                  marginBottom: -1.5,
                  height: 7,
                  width: 45,
                  color: "#444",
                  borderRadius: 3,
                },
                "& .MuiSlider-track": {
                  borderRadius:
                    brillo >= 95 || brillo <= 5 ? 5 : "0px 0px 22px 22px",
                },
              }}
            />
            <div className="luzicono">
              <MdSunny size={30} /> {showValue && <span>{brillo}</span>}
              <MdOutlineWbSunny size={30} />
            </div>
          </div>
        </div>

        <div id="colorcontrolcontainer">
          <span className="btitle">Color</span>
          <div className="imgColor">
            <img src={colores} id="colores" onClick={handleColorPicker} ref={imgRef} alt="imgColor"/>
            {color && (
              <div
                id="circulo"
                style={{
                  marginTop: "5.5%",
                  marginLeft: "-3.5%",
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: circlePosition.y,
                  left: circlePosition.x,
                  border: "2px solid black",
                }}
              ></div>
            )}
          </div>
          <div className="coloresboton">
            <div style={{ backgroundColor: "rgb(251, 250, 162)" }} onClick={() => handleColorSelect("rgb(251, 250, 162)")}>
              <MdBrightnessHigh size={25} />
            </div>
            <div style={{ backgroundColor: "white" }} onClick={handleWhiteColorSelect}>
              <MdBrightnessAuto size={25} />
            </div>
            <div style={{ backgroundColor: "rgb(204, 205, 249)" }} onClick={() => handleColorSelect("rgb(204, 205, 249)")}>
              <MdBrightnessLow size={25} />
            </div>
          </div>
          <div style={{ backgroundColor: color }} className="viewcolor"></div>
        </div>
      </div>
    </div>
  );
}

export default LucesEdit;