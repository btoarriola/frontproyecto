import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import Inicio from './components/pages/inicio';
import Luces from './components/pages/luces';
import Puertas from './components/pages/puertas';
import Alerta from './components/pages/alerta';
import Usuario from './components/pages/usuario';
import IndexLogin from './components/pages/login';
import LucesEdit from './components/pages/luces/edit';
import LucesNew from './components/pages/luces/new';
import PuertasOpen from './components/pages/puertas/open';
import EditCasa from './components/pages/usuario/editcasa';

function App() {
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/luces" element={<Luces />} />
          <Route path="/puertas" element={<Puertas />} />
          <Route path="/alerta" element={<Alerta />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/login" element={<IndexLogin />} />

          {/*Rutas para luces*/}
          <Route path="/luces/edit/:id" element={<LucesEdit />} />
          <Route path="/luces/new" element={<LucesNew />} />

          {/*Ruta para abrir las puertas*/}
          <Route path="/puertas/open" element={<PuertasOpen />} />

          {/*Ruta para editar*/}
          <Route path="/usuario/editcasa" element={<EditCasa />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;