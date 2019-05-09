import React from 'react'

const ShowCountryFull = ({name, capital, population, flag, languages}) => {
    const language = languages.map(language => <li key={language.name}>{language.name}</li>)

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

export default ShowCountryFull