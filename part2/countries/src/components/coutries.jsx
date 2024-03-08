import { useState, useEffect } from 'react';
import weatherService from "../services/weather";

const CountryInfo = ({country}) => {
    const [currentTemp, setCurrentTemp] = useState(null);
    const [currentWind, setCurrentWind] = useState(null);
    const [condition, setCondition] = useState({text: '', icon: ''});

    useEffect(() => {
        weatherService.getWeather(country).then(object => {
            setCurrentTemp(object.current.temp_c);
            setCurrentWind(object.current.wind_kph);
            setCondition({text: object.current.condition.text, icon: object.current.condition.icon});
        });
    }, [country])

    return (
        <>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <p>Languages</p>
            <ul>
                {
                    Object.keys(country.languages).map((key) => (
                        <li key={key}>{country.languages[key]}</li>
                    ))
                }
            </ul>
            <p><img src={country.flags.png} alt={country.name.common} /></p>
            <h3>Weather in {country.name.common}</h3>
            <p>temperature {currentTemp} Celsius</p>
            <p><img src={condition.icon} alt={condition.text} /></p>
            <p>wind {currentWind} k/h</p>
        </>
    )
}

const CountriesList = ({countries, setSearchCountries}) => {
    const handleShowCountry = (showCountry) => setSearchCountries(showCountry.name.common)

    return (
        <>
            {
                countries.length > 10 
                    ? <div>Too many matches, specify another filter</div>
                    : (
                        countries.length === 1 
                        ? <CountryInfo country={countries[0]} />
                        : countries.map(
                                country => (
                                    <div key={country.altSpellings[0]}>
                                        {country.name.common} <button onClick={() => handleShowCountry(country)}>show</button>
                                    </div>
                                )
                            )
                        )
            }
        </>
    )
}

export default CountriesList