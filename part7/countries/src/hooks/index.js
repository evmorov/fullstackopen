import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (place) => {
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

  return weather
}
