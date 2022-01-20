import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ place }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_KEY}&query=${place}`,
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [place])

  if (!weather.current) return null

  return (
    <>
      <h2>Weather in {place}</h2>
      <div>
        <strong>temperature:</strong> {weather.current.temperature} Celsius
      </div>
      <img src={weather.current.weather_icons[0]} alt="Weather" width="100" />
      <div>
        <strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    </>
  )
}

export default Weather
