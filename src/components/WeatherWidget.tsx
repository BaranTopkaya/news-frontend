"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Weather } from "../types"
import "./WeatherWidget.css"

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Weather[]>([])
  const [selectedCity] = useState("İzmir")

  useEffect(() => {
    fetch("http://localhost:8080/api/weather")
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error))
  }, [])

  if (weatherData.length === 0) {
    return <div className="loading">Hava durumu yükleniyor...</div>
  }

  // Get current weather (first item)
  const currentWeather = weatherData[0]

  // Get weather icons based on description
  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "güneşli":
        return "☀️"
      case "yağmurlu":
        return "🌧️"
      case "bulutlu":
        return "☁️"
      case "açık":
        return "🌤️"
      case "fırtına":
        return "⛈️"
      default:
        return "🌡️"
    }
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <div className="city-selector">
          <span>{selectedCity}</span>
          <span className="dropdown-icon">▼</span>
        </div>
        <button className="more-options">⋮</button>
      </div>

      <div className="current-weather">
        <div className="temperature">
          <span className="temp-icon">{getWeatherIcon(currentWeather.description)}</span>
          <span className="temp-value">{currentWeather.temperature.toFixed(0)}°C</span>
        </div>
        <div className="weather-info">
          <span className="weather-description">{currentWeather.description}</span>
          <span className="feels-like">
            Hissedilen: {(currentWeather.temperature - 2 + Math.random() * 4).toFixed(0)}°C
          </span>
        </div>
      </div>

      <div className="forecast">
        {weatherData.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="day-name">
              {index === 0 ? "Bugün" : index === 1 ? "Pzt" : index === 2 ? "Sal" : index === 3 ? "Çar" : "Per"}
            </div>
            <div className="day-icon">{getWeatherIcon(day.description)}</div>
            <div className="day-temp">{day.temperature.toFixed(0)}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherWidget
