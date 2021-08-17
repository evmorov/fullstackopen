import React from 'react';

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((acc, part) => part.exercises + acc, 0);
  return <p><b>total of {total} exercises</b></p>;
};

export default Total;
