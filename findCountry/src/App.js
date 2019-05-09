
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';
import DisplayCountries from './components/displayCountries';

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

    const buttonHandler = (event) =>
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
            buttonHandler={buttonHandler}
            />
        </div>
    )

}

export default App;
