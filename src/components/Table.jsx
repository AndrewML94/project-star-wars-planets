import React, { useContext, useEffect } from 'react';
import { FetchContext } from '../context/FetchContext';
import { FilterContext } from '../context/FilterContext';

function Table() {
  const { fetchPlanets } = useContext(FetchContext);
  const { filteredPLanets, filterTable } = useContext(FilterContext);

  useEffect(() => {
    const resolvePromise = async () => {
      await fetchPlanets();
    };
    resolvePromise();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filterTable.length === 0
              ? filteredPLanets.map((elem) => (
                <tr key={ elem.name }>
                  <td>{ elem.name }</td>
                  <td>{ elem.rotation_period }</td>
                  <td>{ elem.orbital_period }</td>
                  <td>{ elem.diameter }</td>
                  <td>{ elem.climate }</td>
                  <td>{ elem.gravity }</td>
                  <td>{ elem.terrain }</td>
                  <td>{ elem.surface_water }</td>
                  <td>{ elem.population }</td>
                  <td>{ elem.films }</td>
                  <td>{ elem.created }</td>
                  <td>{ elem.edited }</td>
                  <td>{ elem.url }</td>
                </tr>
              ))
              : filterTable.map((elem) => (
                <tr key={ elem.name }>
                  <td>{ elem.name }</td>
                  <td>{ elem.rotation_period }</td>
                  <td>{ elem.orbital_period }</td>
                  <td>{ elem.diameter }</td>
                  <td>{ elem.climate }</td>
                  <td>{ elem.gravity }</td>
                  <td>{ elem.terrain }</td>
                  <td>{ elem.surface_water }</td>
                  <td>{ elem.population }</td>
                  <td>{ elem.films }</td>
                  <td>{ elem.created }</td>
                  <td>{ elem.edited }</td>
                  <td>{ elem.url }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
