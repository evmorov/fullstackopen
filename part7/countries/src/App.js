import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'
import CountryList from './CountryList'
import Filter from './Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const onCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter((country) =>
    countryFilter.length > 0
      ? country.name.toLowerCase().includes(countryFilter.toLowerCase())
      : false,
  )

  const onlyCountry =
    selectedCountry || (filteredCountries.length === 1 ? filteredCountries[0] : null)

  let content = null

  if (onlyCountry) {
    content = <Country country={onlyCountry} />
  } else if (filteredCountries.length > 0) {
    content = <CountryList countries={filteredCountries} onShowClick={setSelectedCountry} />
  } else if (countryFilter.length > 0) {
    content = 'not found..'
  }

  return (
    <>
      <Filter filterValue={countryFilter} onFilterChange={onCountryFilterChange} />

      {content}
    </>
  )
}

export default App
