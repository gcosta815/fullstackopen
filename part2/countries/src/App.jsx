import { useState, useEffect } from 'react';
import countryService from './services/countries';
import CountriesList from './components/coutries';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState('');

  const handleSearchCountries = (event) => setSearchCountries(event.target.value);

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => setCountries(countries))
  }, [])

  const filteredCountries = 
    searchCountries === '' 
      ? []
      : countries.filter(
          country => country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
        );

  return (
    <>
      <div>
        find countries <input value={searchCountries} onChange={handleSearchCountries}/>
      </div>
      <div>
        <CountriesList countries={filteredCountries} setSearchCountries={setSearchCountries} />
      </div>
    </>
  )
}

export default App
