import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchContext = createContext();

function FetchProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    const URL = 'https://swapi.dev/api/planets';
    const response = await fetch(URL);
    const json = await response.json();
    setPlanets(json.results);
  };

  const contextValue = useMemo(() => ({
    planets,
    fetchPlanets,
  }), [planets]);

  return (
    <FetchContext.Provider value={ contextValue }>
      {children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FetchProvider;
