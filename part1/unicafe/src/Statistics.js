import React from 'react';
import Statistic from './Statistic';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = `${(100 / all) * good || 0} %`;

  return (
    <>
      <h2>statistics</h2>
      <Statistic text="good" count={good} />
      <Statistic text="neutral" count={neutral} />
      <Statistic text="bad" count={bad} />
      <Statistic text="all" count={all} />
      <Statistic text="average" count={average} />
      <Statistic text="positive" count={positive} />
    </>
  );
};

export default Statistics;
