import React from 'react'

const ListCountries = ({countries, buttonHandler}) => {
    console.log(countries)
    const rows = countries.map(country => <li key={country}>{country}<button onClick={buttonHandler} value={country}>Show</button></li>)
    return(
        rows
        
    )
}

export default ListCountries