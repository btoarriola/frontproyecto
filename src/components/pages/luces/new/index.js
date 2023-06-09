import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdKeyboardArrowLeft,MdLightbulb } from "react-icons/md";
import "./new.css";
import Header from "../../../common/Header";
import Navbar from "../../../common/Navbar";
import apic from "../../../../services/api";
import Cookies from "universal-cookie";

const cookie = new Cookies();
function LucesNew() {
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

  const newluz = async () => {
    console.log("holaa nueva luz");
    const jsonluz = {
      nombre: form.nombre,
      estado: true,
      brillo: 50,
      programar: null,
      color: "rgb(255, 255, 255)",
    };
    try {
      const user = await apic.post("/luces/", jsonluz);
      console.log(user.usuario);
    } catch (error) {
      console.error("Error al obtener las usuario:", error);
    }
  };
  console.log("acutal", form);

  return (
    <div className="LucesNew">
      <Header />
      <Navbar />
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink activeClassName="active" to="/luces" className="returnboton">
          <MdKeyboardArrowLeft
            size={40}
            style={{ color: "#2141df", marginTop: 7 }}
          />
        </NavLink>
        <span id="title">Nueva luz</span>
      </div>
      <div id="lucescontainer">
        <label id="nota">Nombre</label>
        <input type="text" name="nombre" onChange={handleChange} id="lucesnewinput" placeholder="|" />

        <button onClick={newluz} id="crear">
          <MdLightbulb size={34} style={{ color: "#f69200" }}/>
          <span >Crear</span>
        </button>
      </div>
    </div>
  );
}

export default LucesNew;
