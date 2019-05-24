import React from 'react'
import {setFilter} from '../reducers/filterReducer'

const Filter = (props) => {

    const filter = (event) => {
        event.preventDefault()
        props.store.dispatch(
          setFilter(event.target.value)
        )
      }

    return (
        <div>
        <form onSubmit={filter}>
            <div>
                <input name="filter" onChange={filter} />
            </div>
        </form>
        </div>
    )
}


export default Filter