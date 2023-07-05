import Formulario from './formulario';
import { expect, it, describe } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Formulario', () => {
  
  it('Debería mostrar un error si se ingresan números en el campo de nombre', () => {
    render(
    <BrowserRouter>
      <Formulario />
    </BrowserRouter>);
    
    const nombreInput = screen.getByLabelText('Nombre:', { className: 'sc-eErDDp' });
    fireEvent.change(nombreInput, { target: { value: '123' } });
    
    const warningLabel = screen.getByText('No se pueden ingresar números en el campo. Solo carácteres.');
    expect(warningLabel).toBeTruthy();
  });
  
});