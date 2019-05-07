import React from 'react'

const Course = (course) => {
    console.log(course)
    return (
      <>
        <h1>{Header(course)}</h1>
        <p>{Content(course)}</p>
        <p>{Total(course)}</p>
      </>
    )
  }
  
  const Header = (course) => {
    return (
      course.name
    )
  }
  
  const Content = (course)  => {
    const parts = course.parts
    const content =  parts.map(part => Part(part.name, part.exercises))
    
    
    return(
      content
    )
  }
  
  const Part = (name, exercises) => {
    return(
      <li>{name} {exercises}</li>
    )
  }
  
  const Total = (course) => {
    const parts = course.parts
    const points = parts.map(part => part.exercises)
    const sum = points.reduce((total, amount) => total + amount )
    
    return(
      
      sum
    )
  }
  
  

export default Course