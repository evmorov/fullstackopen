import React from 'react';
import Part from './Part';

const Content = ({ parts: [part1, part2, part3] }) => {
  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  );
};

export default Content;
