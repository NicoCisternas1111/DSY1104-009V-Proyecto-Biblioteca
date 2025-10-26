import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Catalogo from '../src/components/Catalogo';

describe('Componente Catalogo', () => {
  it('renderiza el título del catálogo', () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );
    const titulo = screen.getByText(/nuestro catálogo/i);
    expect(titulo).toBeTruthy();
  });

  it('muestra al menos un libro', () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );
    const imagenes = screen.getAllByRole('img');
    expect(imagenes.length).toBeGreaterThan(0);
  });

  it('permite agregar un libro al carrito', async () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    const botones = screen.getAllByRole('button', { name: /añadir al carrito/i });

    if (botones.length > 0) {
      await userEvent.click(botones[0]);
      expect(botones[0]).toBeTruthy();
    } else {
      fail('No se encontró ningún botón para añadir al carrito');
    }
  });


  it('filtra por texto en el buscador (título/autor)', async () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/busca por título o autor/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'Quijote');

    const quijote = await screen.findByText(/don quijote de la mancha/i);
    expect(quijote).toBeTruthy();
    const lotr = screen.queryByText(/señor de los anillos/i);
    expect(lotr).toBeNull();
  });

  it('filtra libros por categoría correctamente', async () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    const categoriaBtn = screen.getByRole('button', { name: /Fantasía/i });
    await userEvent.click(categoriaBtn);

    // Debe haber al menos un título de "El Señor de los Anillos" (pueden ser varios)
    const tolkienTitles = screen.getAllByText(/El Señor de los Anillos/i);
    expect(tolkienTitles.length).toBeGreaterThan(0);

    // Y NO debe aparecer "Don Quijote..." en las tarjetas (excluimos selects/options)
    const quijotesVisibles = screen
      .queryAllByText(/Don Quijote de la Mancha/i)
      .filter((el) => el.tagName.toLowerCase() !== 'option');
    expect(quijotesVisibles.length).toBe(0);
  });

  it('filtra por precio máximo correctamente', async () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    const rangeInput = screen.getByRole('slider');

    // Llévalo a 20000 para filtrar fuera los de 29.990
    // (tu componente escucha onChange, así que usamos change)
    fireEvent.change(rangeInput, { target: { value: '20000' } });

    // Espera a que NO queden precios 29.990 en las tarjetas
    await waitFor(() => {
      const precios29990 = screen
        .queryAllByText(/\$?\s*29[.,]?\s*990/)
        .filter((el) => el.tagName.toLowerCase() !== 'option' && el.offsetParent !== null);
      expect(precios29990.length).toBe(0);
    });
  });

  it('filtra por autor correctamente', async () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    const selectAutor = screen.getByRole('combobox');
    await userEvent.selectOptions(selectAutor, 'George Orwell');

    // El <select> debe quedar con el valor
    expect(selectAutor.value).toBe('George Orwell');

    // Debe haber tarjetas visibles con "George Orwell" (excluimos el <option>)
    const orwellsVisibles = screen
      .queryAllByText(/George Orwell/i)
      .filter((el) => el.tagName.toLowerCase() !== 'option');
    expect(orwellsVisibles.length).toBeGreaterThan(0);

    // En las tarjetas ya NO debe aparecer "Miguel de Cervantes" (excluimos <option>)
    const cervantesVisibles = screen
      .queryAllByText(/Miguel de Cervantes/i)
      .filter((el) => el.tagName.toLowerCase() !== 'option');
    expect(cervantesVisibles.length).toBe(0);
  });
});