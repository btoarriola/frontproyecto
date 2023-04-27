import React from 'react';
import Toggle from 'react-toggle';
import {Slide,Slider} from '@mui/material';
import 'react-toggle/style.css';
import { useState, useEffect, useRef} from 'react';
import { NavLink} from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineWbSunny } from 'react-icons/md';
import { MdSunny } from 'react-icons/md';
import { MdBrightnessAuto } from 'react-icons/md';
import { MdBrightnessHigh } from 'react-icons/md';
import { MdBrightnessLow } from 'react-icons/md';
import colores from '../../../../assets/img/colores.png';


import './edit.css';
import Header from '../../../common/Header'

function LucesEdit() {

    const [lucesData, setlucesData] = useState({ nombre: "Dormitorio", estado:true, brillo:50, programar:"Diario",color: "" });
    //Este es para el tonggle switch
    const [isChecked, setIsChecked] = useState(lucesData.estado);
    //Este para el slider
    const [value, setValue] = useState(lucesData.brillo);
    const [showValue, setShowValue] = useState(false);
    //Est es para el seleccionador de color
    const [selectedColor, setSelectedColor] = useState(lucesData.color);
    const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    useEffect(() => {
      setlucesData({
        ...lucesData,
        estado: isChecked,
        brillo: value,
        color: selectedColor
      });
    }, [isChecked, selectedColor, value]);

    //Este es para el tonggle switch

    const handleToggle = () => {
      setIsChecked(!isChecked);
      console.log(isChecked);
    }

    //Este para el slider 
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(value);
      setShowValue(true);
    };

    const handleMouseUp = () => {
      setShowValue(false);
    };

    /*Est es para el seleccionador de color*/
    function handleColorPicker(e) {
      const canvas = document.createElement('canvas');
      const img = imgRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const pixelData = ctx.getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1).data;
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      setSelectedColor(color);
      const pixelPos = getPixelPosition(ctx, img.width, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setCirclePosition({ x: pixelPos.x, y: pixelPos.y });
    }

    function handleColorSelect(botonColor) {
      setSelectedColor(botonColor);
      const canvas = document.createElement('canvas');
      const img = imgRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
    
      // Obtener la posición del pixel correspondiente al color seleccionado
      const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;
      let pixelPos = null;
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const index = (y * img.width + x) * 4;
          const color = `rgb(${pixelData[index]}, ${pixelData[index + 1]}, ${pixelData[index + 2]})`;
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
        a: data[index + 3]
      };
    }
    
    function handleWhiteColorSelect() {
      setSelectedColor('rgb(255, 255, 255)');
      setCirclePosition({
        x: '48%',
        y: '45%',
      });
    }
    console.log("Fuera");
    console.log(lucesData); 

    return (
      <div className="LucesEdit">
        <Header/>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <NavLink activeClassName="active" to="/luces" className="returnboton">
            <MdKeyboardArrowLeft size={40} style={{ color: "#2141df" }}/>
          </NavLink>
          <span id="title">{lucesData.nombre}</span>
        </div>
        <div id="controlcontainer">
          <div className='controlluces'>
            <span className="btitle">Estado</span>
            <Toggle
                defaultChecked={isChecked}
                onChange={handleToggle}
                icons={false}
                className="my-toggle-class"
            />
          </div>
          <div className='controlluces' id="programarContainer">
            <span className="text">
                <span className="btitle">Programar</span>
                <span className="bsubtitle">encendido y apagado</span>
            </span>
            <NavLink activeClassName="active" to="/luces" style={{display: 'flex', alignItems: 'center'}} >
              <span className="bsubtitle">{lucesData.programar}</span>
              <MdKeyboardArrowRight size={30} style={{ color: "#fff" }} />
            </NavLink>
          </div>
        </div>

        <div id="luceseditcontainer">

          <div id="brillocontrolcontainer">
              <span className="btitle">Brillo</span>
              <div id="slider">
                <Slider orientation="vertical" value={value} onChange={handleChange} onMouseUp={handleMouseUp} aria-labelledby="continuous-slider"
                  sx={{color: 'white',borderRadius: 5,height:'100%',
                    '& .MuiSlider-thumb': {marginBottom:-1.5,height: 7,width: 45,color: '#444',borderRadius: 3},
                    '& .MuiSlider-track':{borderRadius: (value >= 95 || value <= 5) ? 5 : '0px 0px 22px 22px',}
                  }}/>
                <div className="luzicono"><MdSunny size={30}/> {showValue && <span>{value}</span>}<MdOutlineWbSunny size={30}/></div>
              </div>
          </div>

          <div id="colorcontrolcontainer">
            <span className="btitle">Color</span>
            <div className='imgColor'>
              <img src={colores} id='colores' onClick={handleColorPicker} ref={imgRef}/>
              {selectedColor && (
                <div id="circulo"
                  style={{
                    marginTop: '5.5%',
                    marginLeft: '-3.5%',
                    backgroundColor: selectedColor,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: circlePosition.y ,
                    left: circlePosition.x,
                    border: '2px solid black'
                  }}
                ></div>
              )}
            </div>
            <div className='coloresboton'>
              <div style={{backgroundColor: 'rgb(251, 250, 162)'}} onClick={() => handleColorSelect('rgb(251, 250, 162)')}><MdBrightnessHigh size={25} /></div>
              <div style={{backgroundColor: 'white'}}   onClick={handleWhiteColorSelect}><MdBrightnessAuto size={25} /></div>
              <div style={{backgroundColor: 'rgb(204, 205, 249)'}}  onClick={() => handleColorSelect('rgb(204, 205, 249)')}><MdBrightnessLow size={25} /></div>
            </div>
            <div style={{backgroundColor: selectedColor}} className='viewcolor'></div>
          </div>

        </div>

      </div>
    );
}

export default LucesEdit;