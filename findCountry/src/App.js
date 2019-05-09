
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

const DisplayCountries = ({countries, filter }) => {
    const country = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
    if (country.length >= 10) {
        return (
            <p>Tarkenna hakua</p>
        )
    }

    if (country.length === 1){
        const retCountry = country.map(country => ShowCountryFull(country.name, country.capital, country.population, country.flag, country.languages))
        return(
           retCountry
        )
    }

    if (country.length <10){
    const retCountry = country.map(country => Country(country.name))
    console.log(retCountry)
    return(
        retCountry
    )
    }

}

const Country = (name) => {
    return(
        <div>
            <li key={name}>name: {name}</li>
        </div>
    )
}

const ShowCountryFull = (name, capital, population, flag, languages) => {
    const language = languages.map(language => <li>{language.name}</li>)

    return(
        <div key={name}>
            <li>name: {name}</li>
            <li>capital: {capital}</li>
            <li>population: {population}</li>
            <p>Flag</p>
            <img 
            width ='200'
            length ='200'
            src={flag}
            alt='flag'
            />
            <h3>Languages</h3>
            <p>{language}</p>
        </div>
    )
    
}


const App = () =>{
    const[countries, setCountries] = useState([])
    const[filter, setFilter] = useState('')
    useEffect(() => {
		Axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
                setCountries(response.data)
			})
    }, [])

    const handleFilterChange = (event) =>
    setFilter(event.target.value)
    


    return(
        <div>
            <h1>Countries</h1>
            <input
            onChange={handleFilterChange}
            value={filter}
            />
            <p></p>
            <DisplayCountries
            countries={countries}
            filter={filter}
            />
        </div>
    )

}

export default App;
