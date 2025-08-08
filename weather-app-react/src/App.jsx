import { useState } from "react";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
    console.log('Hello');
      console.log(data);
      
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="description">{weather.weather[0].description}</p>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <div className="details">
            <div className="detail-item">
              <p>Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className="detail-item">
              <p>Wind Speed</p>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
