import { useEffect } from 'react';
import Home from './componentes/home'
import UserPanel from './componentes/perfil'
import Reservas from './componentes/reservas'
import {Routes, Route } from 'react-router-dom';
import Formulario from './componentes/formulario'

const App = () => {

  useEffect(() => {
    // Comprobar si ya existe un usuario en el localStorage
    const usuarioExistente = localStorage.getItem('usuario');
    
    if (!usuarioExistente) {
      // Crear un nuevo objeto de usuario
      const nuevoUsuario = {
        nombre: 'Juan',
        apellido: 'Messi',
        DNI: 123456789,
        email: 'juanmessi23@gmail.com',
        reservas: []
      };
      
      // Guardar el nuevo usuario en el localStorage
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    }
  }, []);

  return (
    <>
    <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/reservas" element={<Reservas />} />
        <Route  path="/perfil" element={<UserPanel />} />
        <Route  path="/nuevareserva" element={<Formulario />} />
    </Routes>
    </>
  );
};

export default App;
