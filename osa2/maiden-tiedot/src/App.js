import { useState, useEffect } from 'react'
import axios from 'axios'


const Result = ({countries, search}) => {
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

  const countryData = (country) => {
    return (
      <div>
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
  return(
    <div>
      {filteredList.length > 10 ? "Too many matches, specify another filter" : 
      filteredList.length === 1 ? countryData(filter(countries)[0]) : 
      filteredList}
    </div>
  )
}


const App = () => {
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
      <Result countries={countries} search={search} />
    </div>
  );
}

export default App;
