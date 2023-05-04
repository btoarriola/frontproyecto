import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import Inicio from './components/pages/inicio';
import Luces from './components/pages/luces';
import Puertas from './components/pages/puertas';
import Alerta from './components/pages/alerta';
import LucesEdit from './components/pages/luces/edit';
import PuertasOpen from './components/pages/puertas/open';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/luces" element={<Luces />} />
          <Route path="/puertas" element={<Puertas />} />
          <Route path="/alerta" element={<Alerta />} />

          {/*Rutas para luces*/}
          <Route path="/luces/edit" element={<LucesEdit />} />

          {/*Ruta para abrir las puertas*/}
          <Route path="/puertas/open" element={<PuertasOpen />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;