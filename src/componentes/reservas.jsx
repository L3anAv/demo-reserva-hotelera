import Card from './card';
import Header from './header'
import styled from 'styled-components';


const ReservasContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Sidebar = styled.div`
  width: 380px;
  padding: 16px;
  background-color: #0d2645;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
`;

const FilterTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  margin-bottom: 50px;
  font-family: 'Roboto';
`;

const FilterItem = styled.div`
  color: #fff;
  margin-bottom: 8px;
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-family: 'Montserrat';
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
`;

const Logo = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #ffff;
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-bottom:40px;

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

const Reservas = () => {

  const hoteles = [
    {
      id: '1',
      nombre: "Hotel Buenos Aires",
      ubicacion: "Buenos Aires",
      descripcion: "Un elegante hotel ubicado en el corazón de la ciudad de Buenos Aires, perfecto para viajeros de negocios y turistas. Ofrece habitaciones cómodas, instalaciones modernas y servicios de alta calidad.",
    },
    {
      id: '2',
      nombre: "Hotel Patagonia",
      ubicacion: "Bariloche",
      descripcion: "Un acogedor hotel situado en la pintoresca ciudad de Bariloche, rodeado de impresionantes paisajes montañosos y lagos. Disfruta de una estadía tranquila y relajante con habitaciones confortables y un ambiente cálido.",
    },
    {
      id: '3',
      nombre: "Hotel Mendoza",
      ubicacion: "Mendoza",
      descripcion: "Un lujoso hotel en la región vinícola de Mendoza, famosa por sus viñedos y bodegas. Experimenta el lujo y la elegancia con amplias habitaciones, restaurantes gourmet y una amplia selección de vinos locales.",
    },
    {
      id:'4',
      nombre: "Hotel Mar del Plata",
      ubicacion: "Mar del Plata",
      descripcion: "Un hermoso hotel ubicado en la famosa ciudad costera de Mar del Plata. Disfruta de vistas panorámicas al mar, acceso directo a la playa y una amplia gama de actividades acuáticas. Ideal para aquellos que buscan relajarse y disfrutar del sol y la playa.",
    }
  ];
  
  return (
    <>
    <ReservasContainer>
      <Sidebar>
      <Logo>Reserva Hotelera</Logo>
        <FilterTitle>Filtros de Búsqueda</FilterTitle>
        <FilterItem>
          <Label>Tipo de Habitación:</Label>
          <SelectInput>
            <option value="">Todos</option>
            <option value="individual">Individual</option>
            <option value="doble">Doble</option>
            <option value="suite">Suite</option>
          </SelectInput>
        </FilterItem>
        <FilterItem>
          <Label>Precio Máximo:</Label>
          <NumberInput type="number" min="0" step="100" />
        </FilterItem>
        <FilterItem>
          <Label>Fecha de Check-in:</Label>
          <DateInput type="date" />
        </FilterItem>
        <FilterItem>
          <Label>Fecha de Check-out:</Label>
          <DateInput type="date" />
        </FilterItem>
      </Sidebar>
      <Header />
      <ContentContainer>
        <CardsContainer>
          <Card id={hoteles[0].id} cardTitle={hoteles[0].nombre} description={hoteles[0].descripcion} ubicacion={hoteles[0].ubicacion} image={'public/imagenesFondo/hotel3.jpg'}/>
          <Card id={hoteles[1].id} cardTitle={hoteles[1].nombre} description={hoteles[1].descripcion} ubicacion={hoteles[1].ubicacion} image={'public/imagenesFondo/hotel2.jpg'}/>
          <Card id={hoteles[2].id} cardTitle={hoteles[2].nombre} description={hoteles[2].descripcion} ubicacion={hoteles[2].ubicacion} image={'public/imagenesFondo/hotel4.jpg'}/>
          <Card id={hoteles[3].id} cardTitle={hoteles[3].nombre} description={hoteles[3].descripcion} ubicacion={hoteles[3].ubicacion} image={'public/imagenesFondo/hotel1.jpg'}/>
        </CardsContainer>
      </ContentContainer>
    </ReservasContainer>
    </>
  );
}

export default Reservas;



