import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const App = () => {
  const all = store.getState().good + store.getState().ok + store.getState().bad || 1

  const calculateMean = () => {
    return store.getState().value / all 
  }

  const calculatePositives = () => {
    return store.getState().good / all * 100
  }
  

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={ok}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
      <p>Kaikki yhteensä: {all}</p>
      <p>{calculateMean()}</p>
      <p>Prosentti positiivisiä ääniä: {calculatePositives()}%</p>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
