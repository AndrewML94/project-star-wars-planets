import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from '../helpers/mockData';
import FetchProvider from '../context/FetchContext';
import FilterProvider from '../context/FilterContext';

describe('Testa a aplicação:', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se a tabela é preenchida corretamente com os planetas;', async () => {
    await act(() => render(
      <FetchProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </FetchProvider>,
    ));

    const tatooine = screen.getByText('Tatooine');
    const alderaan = screen.getByText('Alderaan');

    expect(tatooine).toBeInTheDocument();
    expect(alderaan).toBeInTheDocument();
  });

  it('Verifica se ao digitar no campo de busca de planetas, é retornado o correto;', async () => {
    await act(() => render(
      <FetchProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </FetchProvider>,
    ));

    const searchInput = screen.getByTestId('name-filter');
    const filterButton = screen.getByTestId('button-filter');
    const tatooine = screen.getByText('Tatooine');

    userEvent.type(searchInput, 'tatooine');
    userEvent.click(filterButton);

    expect(tatooine).toBeInTheDocument();
  });

  it('Verifica se ao selecionar inputs do tipo select, o filtro é feito e pode ser excluído;', async () => {
    await act(() => render(
      <FetchProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </FetchProvider>,
    ));

    const columnInput = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnInput, 'population');
    const comparisonInput = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonInput, 'maior que');
    const numberInput = screen.getByTestId('value-filter');
    userEvent.type(numberInput, '250000');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
    const filterSpan = screen.getByTestId('filter-span');

    expect(filterSpan.innerHTML).toBe('population maior que 0250000');

    const buttonEx = screen.getByTestId('filter-btn');
    userEvent.click(buttonEx);
  });

  it('Verifica se o botão "Remover todos os filtros" apaga os filtros;', async () => {
    await act(() => render(
      <FetchProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </FetchProvider>,
    ));

    const columnInput = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnInput, 'population');
    const comparisonInput = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    const numberInput = screen.getByTestId('value-filter');
    userEvent.type(numberInput, '250000');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    const buttonRemoveAll = screen.getByTestId('button-remove-filters');
    userEvent.click(buttonRemoveAll);
  });
});
