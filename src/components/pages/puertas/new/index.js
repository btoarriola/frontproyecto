import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowLeft,MdSensorDoor } from "react-icons/md";
import "./new.css";
import Header from "../../../common/Header";
import Navbar from "../../../common/Navbar";
import apic from "../../../../services/api";
import Cookies from "universal-cookie";

const cookie = new Cookies();
function PuertasNew() {
  const [form, setForm] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (!cookie.get("id")) {
      window.location.href = "./";
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const newpuerta = async () => {
    console.log("holaa nueva puerta");
    const jsonpuerta = {
      nombre: form.nombre,
      estado: false,
    };
    try {
      const user = await apic.post("/puertas/", jsonpuerta);
      console.log(user.usuario);
      window.location.href='/puertas';
    } catch (error) {
      console.error("Error al obtener las usuario:", error);
    }
  };
  console.log("acutal", form);

  return (
    <div className="PuertasNew">
      <Header />
      <Navbar />
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink activeClassName="active" to="/puertas" className="returnboton">
          <MdKeyboardArrowLeft
            size={40}
            style={{ color: "#2141df", marginTop: 7 }}
          />
        </NavLink>
        <span id="title">Nueva puerta</span>
      </div>
      <div id="puertascontainer">
        <label id="nota">Nombre</label>
        <input type="text" name="nombre" onChange={handleChange} id="puertasnewinput" placeholder="|" />

        <button onClick={newpuerta} id="crear">
          <MdSensorDoor size={32} style={{ color: "#c00000" }}/>
          <span style={{marginLeft:'6px'}}>Crear</span>
        </button>
      </div>
    </div>
  );
}

export default PuertasNew;
