import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';
import CountryList from './CountryList';
import Filter from './Filter';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countryFilter.toLowerCase()),
  );

  const onlyCountry =
    selectedCountry || (filteredCountries.length === 1 ? filteredCountries[0] : null);

  return (
    <>
      <Filter filterValue={countryFilter} onFilterChange={onCountryFilterChange} />

      {onlyCountry ? (
        <Country country={onlyCountry} />
      ) : (
        <CountryList countries={filteredCountries} onShowClick={setSelectedCountry} />
      )}
    </>
  );
}

export default App;
