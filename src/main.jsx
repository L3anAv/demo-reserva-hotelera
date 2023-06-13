import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import UserPanel from './componentes/perfil'
import Reservas from './componentes/reservas'
import Formulario from './componentes/formulario'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route  path="/" element={<App />} />
        <Route  path="/reservas" element={<Reservas />} />
        <Route  path="/perfil" element={<UserPanel />} />
        <Route  path="/nuevareserva" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)