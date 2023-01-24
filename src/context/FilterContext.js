import { createContext, useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { FetchContext } from './FetchContext';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const { planets } = useContext(FetchContext);

  const [filterOne, setFilterOne] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [inputOne, setInputOne] = useState('population');
  const [inputTwo, setInputTwo] = useState('0');
  const [inputThree, setInputThree] = useState('maior que');
  const [search, setSearch] = useState('');
  const [filterTable, setFilterTable] = useState([]);
  const [options, setOptions] = useState([]);

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

  const filterButton = () => {
    const filter = filterOne.filter((e) => e !== inputOne);
    setFilterOne(filter);
    setInputOne(filter[0]);
    if (inputThree === 'maior que') {
      const biggerThen = planets.filter((elem) => elem[inputOne] > +inputTwo);
      setFilterTable(biggerThen);
      setOptions([...options, {
        column: inputOne, comparison: inputThree, value: inputTwo, fil: biggerThen,
      }]);
      if (filterTable.length) {
        const newBiggerThen = filterTable.filter((elem) => elem[inputOne] > +inputTwo);
        setFilterTable(newBiggerThen);
        setOptions([...options, {
          column: inputOne, comparison: inputThree, value: inputTwo, fil: biggerThen,
        }]);
      }
    }
    if (inputThree === 'menor que') {
      const lessThan = planets.filter((elem) => elem[inputOne] < +inputTwo);
      setFilterTable(lessThan);
      setOptions([...options, {
        column: inputOne, comparison: inputThree, value: inputTwo, fil: lessThan,
      }]);
      if (filterTable.length) {
        const newLessThan = filterTable.filter((elem) => elem[inputOne] < +inputTwo);
        setFilterTable(newLessThan);
        setOptions([...options, {
          column: inputOne, comparison: inputThree, value: inputTwo, fil: lessThan,
        }]);
      }
    }
    if (inputThree === 'igual a') {
      const equalTo = planets.filter((elem) => elem[inputOne] === inputTwo);
      setFilterTable(equalTo);
      setOptions([...options, {
        column: inputOne, comparison: inputThree, value: inputTwo, fil: equalTo,
      }]);
      if (filterTable.length) {
        const newEqualTo = filterTable.filter((elem) => elem[inputOne] === inputTwo);
        setFilterTable(newEqualTo);
        setOptions([...options, {
          column: inputOne, comparison: inputThree, value: inputTwo, fil: equalTo,
        }]);
      }
    }
  };

  const removeOneFilter = (param) => {
    const removeFilter = options.filter((elem) => elem.column !== param);
    setOptions(removeFilter);
    setFilterOne([...filterOne, param]);
    setFilterTable(options.length === 1 ? removeFilter
      : options[options.length - 2].fil);
  };

  const removeAllFilters = () => {
    setFilterTable([]);
    setOptions([]);
    setFilterOne([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  const contextValue = useMemo(() => ({
    filteredPLanets,
    filterOne,
    filterTable,
    inputTwo,
    options,
    setSearch,
    handleOptions,
    handleNum,
    biggerOrSmaller,
    filterButton,
    removeOneFilter,
    removeAllFilters,
  }), [filteredPLanets, filterOne, filterTable, inputTwo, options]);

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
