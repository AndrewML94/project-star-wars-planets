import React, { useContext, useState, useEffect } from 'react';
import { FetchContext } from './context/FetchContext';
import './App.css';

function App() {
  const { fetchPlanets } = useContext(FetchContext);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const resolvePromise = async () => {
      const resolvePromisse = await fetchPlanets();
      setPlanets(resolvePromisse.results);
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
            planets.map((elem) => (
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

export default App;
