import React from 'react'
import ReactDOM from 'react-dom'
import modules from './modules/modules'


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
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }

  return (
    <div>
      <Header kurssi={course.name}/>
      <Content osa1 = {course.parts[0].name} osa2 = {course.parts[1].name} osa3 = {course.parts[2].name}/>
      <Total tot1 = {course.parts[0].exercises} tot2 = {course.parts[1].exercises} tot3 = {course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))