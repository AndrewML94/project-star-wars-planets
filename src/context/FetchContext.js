import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchContext = createContext();

export function FetchProvider({ children }) {
  const fetchPlanets = async () => {
    const URL = 'https://swapi.dev/api/planets';
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  };

  const contextValue = useMemo(() => ({
    fetchPlanets,
  }), []);

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
