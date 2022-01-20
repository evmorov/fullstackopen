import React from 'react'
import CountryListItem from './CountryListItem'

const CountryList = ({ countries, onShowClick }) => {
  const contryListItems = countries.map((country) => (
    <CountryListItem key={country.numericCode} country={country} onShowClick={onShowClick} />
  ))
  return (
    <div>
      {countries.length > 10 ? 'Too many matches, specify another filter' : contryListItems}
    </div>
  )
}

export default CountryList
