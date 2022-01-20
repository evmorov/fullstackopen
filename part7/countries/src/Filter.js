import React from 'react'

const Filter = ({ filterValue, onFilterChange }) => (
  <div>
    Find countries <input value={filterValue} onChange={onFilterChange} />
  </div>
)

export default Filter
