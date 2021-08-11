import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => part.exercises + acc, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
