import React from 'react'

const Filter = ({submit, filter, filterChange}) => {
    return (
      <form onSubmit = {submit}>
        <div>
          search:
          <input
            value={filter}
            onChange={filterChange}
          />
        </div>
        <div>
          <button type='submit'>rajaa</button>
        </div>
      </form>
    )
  
  }
export default Filter  