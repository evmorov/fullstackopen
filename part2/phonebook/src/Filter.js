import React from 'react';

const Filter = ({ filterWord, onChange }) => (
  <div>
    filter shown with: <input value={filterWord} onChange={onChange} />
  </div>
);

export default Filter;
