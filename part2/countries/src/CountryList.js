import React from 'react';
import CountryListItem from './CountryListItem';

const Countries = ({ countries, onShowClick }) => (
  <div>
    {countries.length > 10
      ? 'Too many matches, specify another filter'
      : countries.map((country) => (
          <CountryListItem key={country.numericCode} country={country} onShowClick={onShowClick} />
        ))}
  </div>
);

export default Countries;
