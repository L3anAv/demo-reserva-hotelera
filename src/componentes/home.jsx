import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const Header = styled.div`
    display:flex;
    margin-top:20px;
    flex-direction:row;
`

const Logo = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #003580;
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-right: auto;
  margin-bottom:100px;

&::before {
  content: 'R';
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #003580;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  margin-right: 5px;
}

`;

const Menu = styled.ul`
  display: flex;
  margin-right:50px;
  list-style-type: none;
`;

const MenuItem = styled.li`
    cursor:pointer;
    font-size: 16px;
    user-select:none;
    font-weight: bold;
    padding-left:22px;
    padding-right:22px;
    font-family: 'Arial', sans-serif;
`;

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

const Home = () => {
  return (
    <Container>
     <Header>
      <Logo>Reserva Hotelera</Logo>
      <Menu>
        <MenuItem><Link to="/">Inicio</Link></MenuItem>
        <MenuItem><Link to="/perfil">Perfil</Link></MenuItem>
      </Menu>
      </Header>
      <CentroInfo>
        <Text>¡Explora nuestras increíbles ofertas de reserva!</Text>
        <Boton>
        <Link to="/reservas"><ButtonText>Conoce nuestras opciones {'>'}</ButtonText></Link>
        </Boton>
      </CentroInfo>
    </Container>
  );
};

export default Home;