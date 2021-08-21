import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';
import CountryList from './CountryList';
import Filter from './Filter';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onCountrySeachChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countryFilter.toLowerCase()),
  );

  return (
    <>
      <Filter filterValue={countryFilter} onFilterChange={onCountrySeachChange} />

      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <CountryList countries={filteredCountries} />
      )}
    </>
  );
}

export default App;
