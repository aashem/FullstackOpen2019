import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) =>{
  console.log(props)
  return(
    <div> {props.p}</div>
  )
}

const Header = (props) => {
  return(
  <div>
  <h1>Kurssin nimi on {props.kurssi} </h1>
  </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <p>Kurssi sisältää</p>
      <Part p={props.osa1}/>
      <Part p={props.osa2}/>
      <Part p={props.osa3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>Yhteensä tehtäviä {props.tot1 + props.tot2 + props.tot3} </div>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header kurssi={course}/>
      <Content osa1 = {parts[0].name} osa2 = {parts[1].name} osa3 = {parts[2].name}/>
      <Total tot1 = {parts[0].exercises} tot2 = {parts[1].exercises} tot3 = {parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))