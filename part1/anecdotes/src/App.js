import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const setRandomSelected = () => {
    let randomSelected = selected;
    while (selected === randomSelected) {
      randomSelected = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomSelected);
  };

  const setVote = () => {
    const copy = { ...votes };
    const selectedValue = copy[selected];
    copy[selected] = (selectedValue || 0) + 1;
    setVotes(copy);
  };

  let mostVoted = 0;
  let mostVotes = 0;
  for (const [anecdoteNumber, votesCount] of Object.entries(votes)) {
    if (votesCount >= mostVotes) {
      mostVoted = anecdoteNumber;
      mostVotes = votesCount;
    }
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected] || 0} votes</div>
      <button onClick={setVote}>vote</button>
      <button onClick={setRandomSelected}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {mostVotes} votes</div>
    </>
  );
};

export default App;
