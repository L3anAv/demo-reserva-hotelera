import { useEffect } from 'react';
import Home from './componentes/home'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AppContainer = styled.div`
  position: relative;
  overflow:hidden;
`;

const Slider = styled(Carousel)`
.carousel .slide {
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
}

.carousel .slide img {
  opacity:0.8;
  object-fit: cover;
  filter: blur(3px);
}

.carousel .thumbs-wrapper {
  display: none;
}
`;

const App = () => {

  const sliderImages = [
    'public/imagenesFondo/hotel1.jpg',
    'public/imagenesFondo/hotel2.jpg',
    'public/imagenesFondo/hotel3.jpg',
    'public/imagenesFondo/hotel4.jpg'
  ];

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
    <AppContainer>
      <Slider infiniteLoop autoPlay showStatus={false} showIndicators={false} showArrows={false} >
        {sliderImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </AppContainer>
    <Home />
    </>
  );
};

export default App;
