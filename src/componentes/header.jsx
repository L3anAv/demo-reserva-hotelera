import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const header = () => {
  return (
    <>
    <Header>
      <Logo>Reserva Hotelera</Logo>
      <Menu>
        <MenuItem><Link to="/">Inicio</Link></MenuItem>
        <MenuItem><Link to="/perfil">Perfil</Link></MenuItem>
        <MenuItem><Link to="/reservas">Reservas</Link></MenuItem>
      </Menu>
      </Header>
    </>
  )
}

export default header

