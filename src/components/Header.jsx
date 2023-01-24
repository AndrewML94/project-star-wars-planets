import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

function Header() {
  const {
    setSearch,
    filterOne,
    handleOptions,
    handleNum,
    biggerOrSmaller,
    filterButton,
    inputTwo,
    options,
    removeOneFilter,
    removeAllFilters,
  } = useContext(FilterContext);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
        placeholder="Buscar planeta"
      />
      <select
        name="select-1"
        data-testid="column-filter"
        onChange={ ({ target }) => handleOptions(target.value) }
      >
        {
          filterOne.map((elem) => (
            <option key={ elem } value={ elem }>{elem}</option>
          ))
        }
      </select>
      <select
        name="select-2"
        data-testid="comparison-filter"
        onChange={ (e) => biggerOrSmaller(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="Quant."
        value={ inputTwo }
        onChange={ ({ target }) => handleNum(target.value) }
      />
      <button
        data-testid="button-filter"
        onClick={ filterButton }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todos os filtros
      </button>
      <div
        data-testid="filter"
      >
        { options.map((elem, index) => (
          <div key={ index }>
            <span>{ `${elem.column} ${elem.comparison} ${elem.value}` }</span>
            <button
              onClick={ () => removeOneFilter(elem.column) }
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
