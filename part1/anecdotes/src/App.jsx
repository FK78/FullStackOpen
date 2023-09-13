/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Uint8Array(10));

  const getRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber)
    return randomNumber;
  }
  
  const handleVoting = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <br></br>
        has {votes[selected]} votes
      </div>
      <Button
        handleClick={() => setSelected(getRandomNumber)}
        text="next anecdote"
      />
      <Button
        handleClick={() => handleVoting()}
        text="vote"
      />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      has {votes[selected]} votes
    </div>
  );
};

export default App;
