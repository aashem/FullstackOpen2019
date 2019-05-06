import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const calculateMean = (value, all) => {
  return(
    value / all
  )
}

const calculatePositives = (all, good) =>{
  let percent = good / all;
  return (
    percent * 100
  )
}



const Statistics = (props) =>{

  if (props.all === 0) {
    return(
      <table>
        <thead>
        <tr>
        <th>Statistiikkaa ei vielä ole</th>
        </tr> 
        </thead>
      </table>
    )
  }
  return(
    <div>
      <table align="left">
        <tbody>
          <tr>
            <th align="left">Statistiikkaa</th>
          </tr>
          <tr>
            <td>Hyvät</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>Huonot}</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>Neutraalit</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>Kaikki</td>
            <td>{props.all}</td>
          </tr>
          <tr>
            <td>Keskiarvo</td>
            <td>{calculateMean(props.value, props.all)}</td>
          </tr>
          <tr>
            <td>Positiivisiä </td>
            <td>{calculatePositives(props.all, props.good)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}



const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [value, setValue] = useState(0)

  const handleGoodClick = () => {
    setAll(all +1)
    setGood(good + 1)
    setValue(value +1)
  }

  const handleBadClick = () => {
    setAll(all +1)
    setBad(bad + 1)
    setValue(value -1)
  }

  const handleNeutralClick = () => {
    setAll(all +1)
    setNeutral(neutral + 1)
    setValue(value -0)
  }

  return (
    <div>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all} value = {value}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)