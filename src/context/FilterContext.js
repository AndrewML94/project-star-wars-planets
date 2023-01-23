import { createContext, useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { FetchContext } from './FetchContext';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const [search, setSearch] = useState('');
  const [inputOne, setInputOne] = useState('population');
  const [inputTwo, setInputTwo] = useState('0');
  const [inputThree, setInputThree] = useState('maior que');
  const [filterOne] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterTable, setFilterTable] = useState([]);
  const { planets } = useContext(FetchContext);

  const filteredPLanets = planets.filter((elem) => elem.name.toLowerCase()
    .includes(search));

  const handleOptions = (param) => {
    setInputOne(param);
  };

  const handleNum = (param) => {
    setInputTwo(param);
  };

  const biggerOrSmaller = (param) => {
    setInputThree(param);
  };

  console.log(inputTwo);

  const filterButton = () => {
    if (inputThree === 'maior que') {
      const biggerThen = planets.filter((elem) => elem[inputOne] > +inputTwo);
      setFilterTable(...filterTable, biggerThen);
    }
    if (inputThree === 'menor que') {
      const lessThan = planets.filter((elem) => elem[inputOne] < +inputTwo);
      setFilterTable(...filterTable, lessThan);
    }
    if (inputThree === 'igual a') {
      const equalTo = planets.filter((elem) => elem[inputOne] === inputTwo);
      setFilterTable(...filterTable, equalTo);
    }
  };

  const contextValue = useMemo(() => ({
    filteredPLanets,
    filterOne,
    filterTable,
    inputTwo,
    setSearch,
    handleOptions,
    handleNum,
    biggerOrSmaller,
    filterButton,
  }), [filteredPLanets, filterOne, filterTable]);

  return (
    <FilterContext.Provider value={ contextValue }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FilterProvider;
