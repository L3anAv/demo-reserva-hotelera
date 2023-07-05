import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './header'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Container = styled.div`
    display: flex;
    position:absolute;
    top:0;
    left:0;
    z-index:1;
    height: 100vh;
    flex-direction: column;
`;

const CentroInfo = styled.div`
    width:90%;
    display: flex;
    margin-top:0px;
    margin-left: auto;
    margin-right: auto;
    border-radius:25px;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.8);
`

const Text = styled.p`
  font-weight:600;
  font-size: 60px;
  margin-top:50px;
  margin-bottom:30px;
  text-align: center;
  font-family: 'Archivo Black', sans-serif;
`;

const Boton = styled.button`
    color: #fff;
    border:2px solid white;
    outline:none;
    cursor: pointer;
    margin-left:20px;
    margin-right:20px;
    padding: 10px 20px;
    margin-bottom:50px;
    border-radius: 15px;
    display: inline-block;
    background-color: #000;
    transition: background-color 0.3s ease;

    &:hover {
      color:#000;
      background-color: #fff;
      border:2px solid black;
    }
`

const ButtonText = styled.a`
  display: block;
  font-size:16px;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

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

const Home = () => {

  const sliderImages = [
    'public/imagenesFondo/hotel1.jpg',
    'public/imagenesFondo/hotel2.jpg',
    'public/imagenesFondo/hotel3.jpg',
    'public/imagenesFondo/hotel4.jpg'
  ];

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
    <Container>
      <Header />
      <CentroInfo>
        <Text>¡Explora nuestras increíbles ofertas de reserva!</Text>
        <Boton>
        <Link to="/reservas"><ButtonText>Conoce nuestras opciones {'>'}</ButtonText></Link>
        </Boton>
      </CentroInfo>
    </Container>
    </>
  );
};

export default Home;