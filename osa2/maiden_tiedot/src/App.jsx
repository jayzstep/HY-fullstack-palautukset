import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;

const WeatherData = ({ weather }) => {
  if (weather.weather) {
    const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    return (
      <div>
        <p>Temperature {weather.main.temp} Celcius</p>
        <img src={icon} alt="weather icon" />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  }
  return (
    <div>
      <p>no weather data available</p>
    </div>
  );
};
const CountryData = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${api_key}`,
      )
      .then((response) => {
        return {
          lat: parseFloat(response.data[0].lat).toFixed(2),
          lon: parseFloat(response.data[0].lon).toFixed(2),
        };
      })
      .then((latLon) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${api_key}&units=metric`,
        ),
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data)
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt="the flag" style={{ width: 400 }} />
      <h1>Weather in {country.capital}</h1>
      <WeatherData weather={weather} />
    </div>
  );
};

const CountriesList = ({ countries, search, handleShow }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length === 1) {
    return <CountryData country={filteredCountries[0]} />;
  }

  return (
    <div>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button
            onClick={() => handleShow(country.name.common)}
            value={country.name.common}
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  if (!countries) {
    return null;
  }

  const handleSearch = (event) => setSearch(event.target.value);

  const handleShow = (countryName) => {
    setSearch(countryName);
  };
  return (
    <div>
      Find countries <input onChange={handleSearch} value={search} />
      <CountriesList
        countries={countries}
        search={search}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
