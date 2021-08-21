import React from 'react';
import CountryListItem from './CountryListItem';

const Countries = ({ countries }) => (
  <div>
    {countries.length > 10
      ? 'Too many matches, specify another filter'
      : countries.map((country) => <CountryListItem key={country.numericCode} country={country} />)}
  </div>
);

export default Countries;
