import styled from 'styled-components';
import { Link, useNavigate  } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { differenceInCalendarDays } from 'date-fns';

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin-top: 20px;
`;

const MenuItem = styled.li`
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  font-weight: bold;
  padding-left: 22px;
  padding-right: 22px;
  font-family: 'Arial', sans-serif;
`;

const Enlace = styled(Link)`
    color:#000;
`

const FormContainer = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;
  margin-bottom: 30px;
  justify-content: center;

  p{
    margin:0;
    font-weight: bold;
  }
`;

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 800px;
  padding: 40px;
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 25px;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size:15px;
  margin-top:10px;
  margin-bottom: 10px;
  font-family:'Montserrat';
`;

const WargningLabel = styled(Label)`
  font-size:12; 
  color:red;
`

const Costos = styled(Label)`
  font-size:12px;
  margin-top:3px;
  margin-bottom: 3px;
`

const Input = styled.input`
  outline: none;
  padding: 10px;
  margin-bottom:10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  outline: none;
  padding: 10px;
  font-size:16px;
  border-radius: 15px;
  border: 1px solid #ccc;

`;

const Enviar = styled.button`
  padding:8px;
  font-size:22px;
  font-weigth:400;
  cursor:pointer;
  background:none;
  text-aling:center;
  border-radius:30px;
  font-family:'Roboto';
  border:2px solid black;
`

const Option = styled.option``;

const CheckboxLabel = styled.label`
  display: flex;
  font-size:16px;
  align-items: center;
  margin-bottom: 5px;
  font-family:'Montserrat';
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const PersonContainer = styled.div`
  padding: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 25px;
  border: 2px solid black;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
`;

const PersonaID = styled.div`
  margin-top: 15px;
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Formulario = () => {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState();
  const [email, setEmail] = useState('');
  const [medioPago, setMedioPago] = useState('');

  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    vencimiento: '',
    codigo: '',
  });

  const [warnings, setWarningState] = useState({
    nombre: {
      mostrar:false,
      valor:'No se pueden ingresar números en el campo. Solo caracteres.'
    },
    apellido: {
      mostrar:false,
      valor:'No se pueden ingresar números en el campo. Solo caracteres.'
    },
    dni: {
      mostrar:false,
      valor:'No se pueden ingresar caracteres en el campo. Solo números.'
    },
    Email: {
      mostrar:false,
      valor:'No se pueden ingresar caracteres en el campo. Solo números.'
    },
    Fecha: {
      mostrar:false,
      valor:'No se puede selecciona una fecha menor a la de inicio de servicio de hospedaje.'
    }
    
  })

  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);

    // Permitir solo números (0-9)
    if (!/^[0-9]+$/.test(keyValue)) {
      e.preventDefault();

      if(e.target.name === 'dniPersona'){
        setWarningState((prevState) => ({
          ...prevState,
          dni:{
            mostrar: true,
            valor: 'No se pueden ingresar caracteres en el campo. Solo números.',
          },
        }));
      }else if(e.target.name === 'dniPersonas'){
        setWarningStatePersona((prevState) => ({
          ...prevState,
          dni:{
            mostrar: true,
            valor: 'No se pueden ingresar caracteres en el campo. Solo números.',
          },
        }));
      }
      
    }
  };

  const [warningsPersona, setWarningStatePersona] = useState({
    nombre: {
      mostrar:false,
      valor:'No se pueden ingresar números en el campo. Solo caracteres.'
    },
    apellido: {
      mostrar:false,
      valor:'No se pueden ingresar números en el campo. Solo caracteres.'
    },
    dni: {
      mostrar:false,
      valor:'No se pueden ingresar caracteres en el campo. Solo números.'
    }
  })

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const [hotel, setHotel] = useState('');
  const [cantidadPersonas, setCantidadPersonas] = useState(0);
  const [personas, setPersonas] = useState([]);
  const [esMayorEdad] = useState(false);

  const [servicios, setServicios] = useState({
    planchado: false,
    lavado: false,
    minibar: false,
  });

  const handleMedioPagoChange = (e) => {
    setMedioPago(e.target.value);
    setDatosTarjeta({
      numero: '',
      vencimiento: '',
      codigo: '',
    });
  };
  
  const [fechaFin, setFechaFin] = useState(null);
  const [costoTotal, setCostoTotal] = useState(0);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [cantidadDias, setCantidadDias] = useState(null);
  const [costoPorDiaEstadia, setcostoPorDiaEstadia] = useState(0);
  const [buscarUsuario, setBuscarUsuario] = useState(false);
  
  const handleCheckboxChange = (event) => {
    setBuscarUsuario(event.target.checked);
  };
  
  useEffect(() => {
    if (buscarUsuario) {
      const usuarioGuardado = localStorage.getItem('usuario');
      
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        setNombre(usuario.nombre)
        setApellido(usuario.apellido)
        setDni(usuario.DNI)
        setEmail(usuario.email)
      }
    }
  }, [buscarUsuario]);


   useEffect(() => {
    const hotelElegido = localStorage.getItem('hotelElegido');
    
    if (hotelElegido) {
      setHotel(hotelElegido)
    }
  }, []);

  useEffect(() => {

    if(hotel === '1'){
      setcostoPorDiaEstadia(9000)
    }else if(hotel === '2'){
      setcostoPorDiaEstadia(12000)
    }else if(hotel === '3'){
      setcostoPorDiaEstadia(30000)
    }else if(hotel === '4'){
      setcostoPorDiaEstadia(15000)
    }else if(hotel === ''){
      setcostoPorDiaEstadia(0)
    }
    console.log(costoPorDiaEstadia)
  }, [hotel, costoPorDiaEstadia])

   const handleFechaInicioChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setFechaInicio(selectedDate);
  };
  
  const handleFechaFinChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate > fechaInicio) {
    setFechaFin(selectedDate);
    setWarningState((prevState) => ({
      ...prevState,
      Fecha: {
        mostrar: false,
        valor: 'No se puede selecciona una fecha menor a la de inicio de servicio de hospedaje.'
      }
    }));
    }else if(selectedDate.getTime() === fechaInicio.getTime()){
      setFechaFin();
      setWarningState((prevState) => ({
        ...prevState,
        Fecha: {
          mostrar: true,
          valor: 'No se puede selecciona la misma fecha a la de inicio de servicio de hospedaje.'
        }
      }));
    }else{
      setFechaFin();
      setWarningState((prevState) => ({
        ...prevState,
        Fecha: {
          mostrar: true,
          valor: 'No se puede selecciona una fecha menor a la de inicio de servicio de hospedaje.'
        }
      }));
    }
  };

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      calcularCantidadDias(fechaInicio, fechaFin);
    }
  }, [fechaInicio, fechaFin]);

  const calcularCantidadDias = (inicio, fin) => {
    if (inicio && fin) {
      const days = differenceInCalendarDays(fin, inicio);
      setCantidadDias(days);
    } else {
      setCantidadDias(0);
    }
  };

    const calcularCostoTotal = () => {
      const total = cantidadDias * costoPorDiaEstadia;

      if(personas.length == 0){
        setCostoTotal(total);
      }else{
        const totalConPersonas = total  + (total * personas.length)
        setCostoTotal(totalConPersonas);
      }
      
    };

    useEffect(() => {
      calcularCostoTotal();
    },  [cantidadDias, costoPorDiaEstadia, personas, hotel]);
  
    /*
  function handleCheckboxChange(e) {
    setEsMayorEdad(e.target.checked);
  }
  */
 
  const handleServiciosChange = (e) => {
    setServicios({
      ...servicios,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePersonaChange = (index, field, value) => {
    const updatedPersonas = [...personas];
    updatedPersonas[index][field] = value;
    setPersonas(updatedPersonas);
  };

  const handleCantidadPersonasChange = (e) => {
    const value = parseInt(e.target.value);
    setCantidadPersonas(value);

    if (personas.length > value && value != 0) {
      setPersonas(personas.slice(0, value));
    } else if (personas.length < value) {
      for (let i = personas.length; i < value; i++) {
        setPersonas((prevPersonas) => [
          ...prevPersonas,
          { nombre: '', apellido: '', dni: '', esMayorEdad: false },
        ]);
      }
    }
  };

  const handleRemovePersona = (index) => {
    if(cantidadPersonas != 1){
      setPersonas((prevPersonas) => {
        const updatedPersonas = [...prevPersonas];
        updatedPersonas.splice(index, 1);
        return updatedPersonas;
      });
    }else{
      setCantidadPersonas(0)
      setPersonas((prevPersonas) => {
        const updatedPersonas = [...prevPersonas];
        updatedPersonas.splice(index, 1);
        return updatedPersonas;
      });
    }
    
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(nombre != '' &&
      apellido != '' &&
      dni != '' &&
      email != ''){
        EnviarDatos()
        navigate("/perfil");
    }else{
      alert('Faltan completar datos en el formulario.')
    }
    
    console.log('Formulario enviado');
  };

  const EnviarDatos = () => {
    
    const nuevoUsuario = JSON.parse(localStorage.getItem('usuario'));

    const datosReserva = {
      nombre,
      apellido,
      dni,
      email,
      medioPago,
      datosTarjeta,
      hotel,
      cantidadPersonas,
      personas,
      esMayorEdad,
      servicios,
      cantidadDias,
      costoTotal,
      fechaInicio,
      fechaFin
    };
    
    nuevoUsuario.reservas.push(datosReserva);

    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  };

  return (
    <>
    <Menu>
        <MenuItem>
          <Enlace to="/">Inicio</Enlace>
        </MenuItem>
        <MenuItem>
          <Enlace to="/perfil">Perfil</Enlace>
        </MenuItem>
      </Menu>

    <FormContainer>
      <FormWrapper onSubmit={handleFormSubmit}>
        <FormColumn>

          <Label>Nombre:</Label>
          <Input
            type="text"
            name="Nombre"
            value={nombre}
            onChange={(e) => {
              const hasNumber = /\d/.test(e.target.value);
              if (hasNumber) {
                setNombre('')
                setWarningState((prevState) => ({
                  ...prevState,
                  nombre: {
                    mostrar: true,
                    valor: 'No se pueden ingresar números en el campo. Solo carácteres.'
                  }
                }));
              } else {
                setNombre(e.target.value)
                setWarningState((prevState) => ({
                  ...prevState,
                  nombre: {
                    mostrar: false,
                    valor: ''
                  }
                }));
              }}}
            required
          />
          {warnings.nombre.mostrar && <WargningLabel>{warnings.nombre.valor}</WargningLabel>}

          <Label>Apellido:</Label>
          <Input
            type="text"
            value={apellido}
            onChange={(e) => {
              const hasNumber = /\d/.test(e.target.value);
              if (hasNumber) {
                setApellido('')
                setWarningState((prevState) => ({
                  ...prevState,
                  apellido: {
                    mostrar: true,
                    valor: 'No se pueden ingresar números en el campo. Solo carácteres.'
                  }
                }));
              } else {
                setApellido(e.target.value)
                setWarningState((prevState) => ({
                  ...prevState,
                  apellido: {
                    mostrar: false,
                    valor: ''
                  }
                }));
              }}}
            required
          />
          {warnings.apellido.mostrar && <WargningLabel>{warnings.apellido.valor}</WargningLabel>}

          <Label>DNI:</Label>
          <Input
              type="text"
              value={dni}
              name="dniPersona"
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                const value = e.target.value;
                const hasOnlyNumbers = /^[0-9]+$/.test(value);

                if (!hasOnlyNumbers) {
                  setDni('')
                  setWarningState((prevState) => ({
                    ...prevState,
                    dni:{
                      mostrar: true,
                      valor: 'No se pueden ingresar caracteres en el campo. Solo números.',
                    },
                  }));
                } else {
                  setDni(value)
                  setWarningState((prevState) => ({
                    ...prevState,
                    dni: {
                      mostrar: false,
                      valor: '',
                    },
                  }));
                }
              }}
              required
            />

          {warnings.dni.mostrar && <WargningLabel>{warnings.dni.valor}</WargningLabel>}
              
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)
            }
            onBlur={(e) => {
              if (!isValidEmail(e.target.value)) {
                setWarningState((prevState) => ({
                  ...prevState,
                  Email:{
                    mostrar: true,
                    valor: 'Por favor ingrese un email válido.'
                  }
                }));
              } else {
                setWarningState((prevState) => ({
                  ...prevState,
                  Email: {
                    mostrar: false,
                    valor: ''
                  }
                }));
              }
            }}
            required
          />
          {warnings.Email.mostrar && <WargningLabel>{warnings.Email.valor}</WargningLabel>}

          <CheckboxLabel>
        <CheckboxInput type="checkbox" checked={buscarUsuario} onChange={handleCheckboxChange} />
        Reservar con mis datos
        </CheckboxLabel>

        <Label>Desde:</Label>
        <Input
          type="date"
          value={fechaInicio ? fechaInicio.toISOString().split('T')[0] : ''}
          onChange={handleFechaInicioChange}
          required
        />

        <Label>Hasta:</Label>
        <Input
          type="date"
          value={fechaFin ? fechaFin.toISOString().split('T')[0] : ''}
          onChange={handleFechaFinChange}
          required
        />
       {warnings.Fecha.mostrar && <WargningLabel>{warnings.Fecha.valor}</WargningLabel>}
      
          <Label>Medio de Pago:</Label>
          <Select value={medioPago} onChange={handleMedioPagoChange} required>
            <Option value="">Seleccionar</Option>
            <Option value="pago efectivo">Pago en Efectivo</Option>
            <Option value="pago tarjeta">Pago con Tarjeta</Option>
          </Select>

          {medioPago === 'pago_tarjeta' && (
            <>
              <Label>Número de Tarjeta:</Label>
              <Input
                type="text"
                value={datosTarjeta.numero}
                onChange={(e) =>
                  setDatosTarjeta({
                    ...datosTarjeta,
                    numero: e.target.value,
                  })
                }
                required
              />

              <Label>Vencimiento:</Label>
              <Input
                type="text"
                value={datosTarjeta.vencimiento}
                onChange={(e) =>
                  setDatosTarjeta({
                    ...datosTarjeta,
                    vencimiento: e.target.value,
                  })
                }
                required
              />

              <Label>Código de Seguridad:</Label>
              <Input
                type="text"
                value={datosTarjeta.codigo}
                onChange={(e) =>
                  setDatosTarjeta({
                    ...datosTarjeta,
                    codigo: e.target.value,
                  })
                }
                required
              />
            </>
          )}
        </FormColumn>

        <FormColumn>
          <Label>Hotel:</Label>
          <Select
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            required
          >
            <Option value="">Seleccionar</Option>
            <Option value="1">Hotel Buenos Aires</Option>
            <Option value="2">Hotel Patagonia</Option>
            <Option value="3">Hotel Mendoza</Option>
            <Option value="4">Hotel Mar del Plata</Option>
          </Select>

          <Label>Cantidad de Personas en Habitación:</Label>
          <Select
            value={cantidadPersonas}
            onChange={handleCantidadPersonasChange}
            required
          >
            <Option value="0">Seleccionar</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
          </Select>

          {personas.map((persona, index) => (
            <div key={index}>
              <PersonContainer key={index}>
                <PersonaID>
                  <label> {'>'} Persona {index + 1}:</label>
                </PersonaID>
                <div>
                  <label>Nombre:</label>
                  <Input
                    type="text"
                    value={persona.nombre}
                    onChange={(e) => {
                        const hasNumber = /\d/.test(e.target.value);
                        if (hasNumber) {
                          handlePersonaChange(index, "nombre", '')
                          setWarningStatePersona((prevState) => ({
                            ...prevState,
                            nombre: {
                              mostrar: true,
                              valor: 'No se pueden ingresar números en el campo. Solo carácteres.'
                            }
                          }));
                        } else {
                          handlePersonaChange(index, "nombre", e.target.value)
                          setWarningStatePersona((prevState) => ({
                            ...prevState,
                            nombre: {
                              mostrar: false,
                              valor: ''
                            }
                          }));
                        }}}
                    required
                  />
                  {warningsPersona.nombre.mostrar && <WargningLabel>{warningsPersona.nombre.valor}</WargningLabel>}
                </div>
                <div>
                  <label>Apellido:</label>
                  <Input
                    type="text"
                    value={persona.apellido}
                    onChange={(e) =>{
                      const hasNumber = /\d/.test(e.target.value);
                      if (hasNumber) {
                        handlePersonaChange(index, "apellido", '')
                        setWarningStatePersona((prevState) => ({
                          ...prevState,
                          apellido: {
                            mostrar: true,
                            valor: 'No se pueden ingresar números en el campo. Solo carácteres.'
                          }
                        }));
                      } else {
                        handlePersonaChange(index, "apellido", e.target.value)
                        setWarningStatePersona((prevState) => ({
                          ...prevState,
                          apellido: {
                            mostrar: false,
                            valor: ''
                          }
                        }));
                      }}}
                    required
                  />
                  {warningsPersona.apellido.mostrar && <WargningLabel>{warningsPersona.apellido.valor}</WargningLabel>}
                </div>
                <div>
                  <label>DNI:</label>
                  <Input
                    type="text"
                    value={persona.dni}
                    name="dniPersonas"
                    onKeyPress={handleKeyPress}
                    onInput={(e) => {
                      const keyValue = e.target.value;
                      const hasOnlyNumbers = /^[0-9]+$/.test(keyValue);
                  
                      if (!hasOnlyNumbers) {
                        handlePersonaChange(index, 'dni', null);
                        setWarningStatePersona((prevState) => ({
                          ...prevState,
                          dni: {
                            mostrar: true,
                            valor: 'No se pueden ingresar caracteres en el campo. Solo números.',
                          },
                        }));
                      } else {
                        handlePersonaChange(index, 'dni', keyValue);
                        setWarningStatePersona((prevState) => ({
                          ...prevState,
                          dni: {
                            mostrar: false,
                            valor: '',
                          },
                        }));
                      }
                    }}
                    required
                  />

                  {warningsPersona.dni.mostrar && <WargningLabel>{warningsPersona.dni.valor}</WargningLabel>}
                </div>
                <div>
                  <CheckboxLabel>
                    <CheckboxInput
                      type="checkbox"
                      checked={persona.esMayorEdad}
                      onChange={(e) =>
                        handlePersonaChange(
                          index,
                          "esMayorEdad",
                          e.target.checked
                        )
                      }
                    />
                    Es Mayor de Edad
                  </CheckboxLabel>
                </div>
                <div>
                  <RemoveButton
                    type="button"
                    onClick={() => handleRemovePersona(index)}
                  >
                    Eliminar Persona
                  </RemoveButton>
                </div>
              </PersonContainer>
            </div>
          ))}

          <Label>Servicios:</Label>
          <div>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                name="planchado"
                checked={servicios.planchado}
                onChange={handleServiciosChange}
              />
              Planchado
            </CheckboxLabel>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                name="lavado"
                checked={servicios.lavado}
                onChange={handleServiciosChange}
              />
              Lavado
            </CheckboxLabel>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                name="minibar"
                checked={servicios.minibar}
                onChange={handleServiciosChange}
              />
              Minibar
            </CheckboxLabel>
          </div>
        </FormColumn>
        
        <Costos>Costo de estadía día completo por Persona:</Costos>
        <p>${costoPorDiaEstadia}</p>

        <Costos>Costo Total:</Costos>
        <p>${costoTotal}</p>


        <div>
          <Enviar type="submit">Enviar</Enviar>
        </div>

      </FormWrapper>
    </FormContainer>
    </>
  );
};

export default Formulario;