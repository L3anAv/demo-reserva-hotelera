import { fireEvent, expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import Formulario from './formulario'

describe('Formulario', () => {
  it('debería mostrar un error si se ingresan números en el campo de nombre', () => {
    render(<Formulario />);
    
    const nombreInput = screen.getByLabelText('Nombre:');
    fireEvent.change(nombreInput, { target: { value: '123' } });
    
    const warningLabel = screen.getByText('No se pueden ingresar números en el campo. Solo carácteres.');
    expect(warningLabel).toBeInTheDocument();
  });
  
});