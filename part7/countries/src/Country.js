import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>

    <h3>languages</h3>
    <ul>
      {country.languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>

    <img src={country.flag} alt="Flag" width="100" />

    <Weather place={country.capital} />
  </div>
)

export default Country
