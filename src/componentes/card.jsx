import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 370px;
  margin: 10px;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const CardImageElement = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const CardTitle = styled.h2`
  text-align: center;
  margin-bottom: 5px;
`;

const CardDescription = styled.p`
  font-size:12px;
  text-align: center;
  margin-bottom: 10px;
`;

const CardUbicacion = styled.p`
  font-size:15px;
  text-align: center;
  margin-bottom: 10px;
`

const CardButton = styled.button`
  display: block;
  margin: 0 auto;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;


const Card = ({id, cardTitle, description, image, ubicacion }) => {

    const handleClick = () => {
        localStorage.setItem('hotelElegido', id);
    };

  return (
    <CardContainer>
      <CardImage>
        <CardImageElement src={image} alt="Imagen" />
      </CardImage>
      <CardTitle>{cardTitle}</CardTitle>
      <CardUbicacion>{ubicacion}</CardUbicacion>
      <CardDescription>{description}</CardDescription>
      <CardButton><Link to="/nuevareserva" onClick={handleClick}>Reservar</Link></CardButton>
    </CardContainer>
  );
}

Card.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ubicacion: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Card;