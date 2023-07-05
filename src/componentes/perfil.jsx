import Header from './header'
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UserPanel = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const reservas = usuario ? usuario.reservas : [];


  const [forceUpdate, setForceUpdate] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("es-AR");
    return formattedDate;
  };

  const eliminarReserva = (index) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.reservas) {
      if (index >= 0 && index < usuario.reservas.length) {
        usuario.reservas.splice(index, 1);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        setForceUpdate(!forceUpdate);
      }
    }
  };

  const hoteles = [
    {
      id: '1',
      nombre: 'Hotel Buenos Aires',
    },
    {
      id: '2',
      nombre: 'Hotel Patagonia',
    },
    {
      id: '3',
      nombre: 'Hotel Mendoza',
    },
    {
      id: '4',
      nombre: 'Hotel Mar del Plata',
    },
  ];

  return (
    <Container>
      <Header />
      <Panel>
        <OptionsPanel>
          <Title>Opciones de perfil</Title>
          <OptionsList>
          <OptionItem>
              <Icon className="fas fa-calendar-alt" />
              <OptionLabel><Link to="/nuevareserva">Hacer nueva reserva</Link></OptionLabel>
            </OptionItem>
            <OptionItem>
              <Icon className="fas fa-calendar-alt" />
              <OptionLabel><Link to="/reservas">Ver más información de reservas</Link></OptionLabel>
            </OptionItem>
            <OptionItem>
              <Icon className="fas fa-sign-out-alt" />
              <OptionLabel>
                <Link to="/">Salir</Link>
              </OptionLabel>
            </OptionItem>
          </OptionsList>
        </OptionsPanel>
        <ReservationsPanel>
          <Title>Reservas Activas</Title>
          <ReservationCards>
            {reservas.map((reserva, index) => (
              <ReservationCard key={index}>
                <ReservationInfo>
                  <ReservationLabel>Reserva para:</ReservationLabel>
                  <ReservationValue>{reserva.nombre}</ReservationValue>
                  <ReservationValue>{reserva.apellido}</ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Pago:</ReservationLabel>
                  <ReservationValue>{reserva.medioPago}</ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Hotel:</ReservationLabel>
                  <ReservationValue>
                  {hoteles.find((hotel) => hotel.id === reserva.hotel)?.nombre}
                  </ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Personas adicionales:</ReservationLabel>
                  <ReservationValue>{reserva.cantidadPersonas}</ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Fecha Incio:</ReservationLabel>
                  <ReservationValue>{formatDate(reserva.fechaInicio)}</ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Fecha De Fin de estadia:</ReservationLabel>
                  <ReservationValue>{formatDate(reserva.fechaFin)}</ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Cantidad de días:</ReservationLabel>
                  <ReservationValue>{reserva.cantidadDias}</ReservationValue>
                </ReservationInfo>
                <ReservationInfo>
                  <ReservationLabel>Total:</ReservationLabel>
                  <ReservationValue>{reserva.costoTotal}</ReservationValue>
                </ReservationInfo>
                <ModifyButton>
                  Modificar Reserva
                </ModifyButton>
                <CancelButton onClick={() => eliminarReserva(index)}>
                  Cancelar reserva
                </CancelButton>
              </ReservationCard>
            ))}
            </ReservationCards>
        </ReservationsPanel>
      </Panel>
    </Container>
  );
};

const Container = styled.div`
  color: #000;
  width:100%;
  display: flex;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
`;

const ReservationCard = styled.div`
  height: 350px;
  padding: 20px;
  background:#fff;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ReservationInfo = styled.div`
  margin-bottom: 10px;
`;

const ReservationLabel = styled.span`
  font-weight: bold;
`;

const ReservationValue = styled.span`
  margin-left: 5px;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
`;

const OptionsPanel = styled.div`
  padding: 20px;
  heigth:100vh;
  border-right:5px solid white;
  margin-bottom: 10px;
`;

const ReservationsPanel = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.i`
  font-size: 20px;
  margin-right: 10px;
`;

const OptionLabel = styled.span`
  font-size: 16px;
`;

const ReservationCards = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const CancelButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  margin-right:10px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const ModifyButton = styled.button`
  background-color: #45a049;
  color: #fff;
  border: none;
  margin-right:10px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

export default UserPanel;