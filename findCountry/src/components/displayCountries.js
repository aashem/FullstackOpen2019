import React from 'react'
import Country from './country'
import ShowCountryFull from './showCountryFull'
import ListCountries from './listCountries'


const DisplayCountries = ({countries, filter, buttonHandler}) => {  
    const country = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
    if (country.length >= 10) {
        return (
            <p>Tarkenna hakua</p>
        )
    }

    if (country.length === 1){
        const retCountry = country.map(country => 
        <ShowCountryFull
            key={country.name}
            name={country.name} 
            languages={country.languages}
            flag = {country.flag}
            capital={country.capital}
            population={country.population}/>)
        return(
            retCountry
        )
    }

    if (country.length <10){
    const retCountry = country.map(country => Country(country.name))
    return(
        <ListCountries countries = {retCountry} buttonHandler = {buttonHandler}/>
    )
    }

}



export default DisplayCountries