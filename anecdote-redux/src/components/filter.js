import React from 'react'
import {setFilter} from '../reducers/filterReducer'
import {connect} from 'react-redux'

const Filter = props => {

    const filter = event => {
        event.preventDefault()
        props.setFilter(event.target.value)
      }

    return (
        <div>
        <form onSubmit={filter}>
            <div>
                Filter:
                <input name="filter" onChange={filter} />
            </div>
        </form>
        </div>
    )
}
const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = {
    setFilter,
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)