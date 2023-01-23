import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FetchProvider from './context/FetchContext';
import FilterProvider from './context/FilterContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FetchProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </FetchProvider>,
  );
