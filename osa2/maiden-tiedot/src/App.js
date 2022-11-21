import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryData = ({country, api_key}) => {
  const [coordinates, setCoordinates] =useState([])
  //const [lon, lat] = coordinates

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${api_key}`)
    .then(response => {
      setCoordinates([response.data[0]])
    })
  }, [])

  return (
    <div>
      <div>{console.log(coordinates)}</div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} alt="the flag" style={{width: 400}}/>
    </div>
  )
}

const Result = ({countries, search, api_key}) => {
  const filter = (countries) => (
    countries
    .filter(country => country.name.common.toLowerCase()
    .includes(search.toLowerCase()))
  )

  const filteredList = filter(countries)
  .map(country => {
    return (
      <div key={country.name.common}>
        {country.name.common}
        <button>show</button>
      </div>

  )})

  return (
    <div>
      {filteredList.length > 10 ? "Too many matches, specify another filter" : 
      filteredList.length === 1 ? <CountryData country={filter(countries)[0]} api_key={api_key}/> : 
      filteredList}
    </div>
  )
}


const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      Find countries <input onChange={handleSearch} value={search} />
      <Result countries={countries} search={search} api_key={api_key} />
    </div>
  );
}

export default App;
