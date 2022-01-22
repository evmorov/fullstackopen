import React from 'react'
import { useCountry } from './hooks/index.js'

const Weather = ({ place }) => {
  const country = useCountry(place)

  if (!country.current) return null

  return (
    <>
      <h2>Weather in {place}</h2>
      <div>
        <strong>temperature:</strong> {country.current.temperature} Celsius
      </div>
      <img src={country.current.weather_icons[0]} alt="Weather" width="100" />
      <div>
        <strong>wind:</strong> {country.current.wind_speed} mph direction {country.current.wind_dir}
      </div>
    </>
  )
}

export default Weather
