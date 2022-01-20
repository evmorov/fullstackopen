import React from 'react'

const CountryListItem = ({ country, onShowClick }) => (
  <div>
    <span>{country.name}</span>
    <button onClick={() => onShowClick(country)}>show</button>
  </div>
)

export default CountryListItem
