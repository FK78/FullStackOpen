/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

// const StatisticLine = ({ text, value }) => {
//   return (
//     <tr>
//       <td>{text}</td>
//       <td>{value}</td>
//     </tr>
//   );
// };

// const Statistics = ({ good, neutral, bad, all }) => {
//   if (!all) {
//     return <p>No feedback given</p>;
//   } else {
//     return (
//       <table>
//         <tbody>
//           <StatisticLine text="Good" value={good} />
//           <StatisticLine text="Neutral" value={neutral} />
//           <StatisticLine text="Bad" value={bad} />
//           <StatisticLine text="All" value={good + neutral + bad} />
//           <StatisticLine text="Average" value={(good - bad) / all} />
//           <StatisticLine text="Positive" value={(good * 100) / all + " %"} />
//         </tbody>
//       </table>
//     );
//   }
// };

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0)


  // const all = good + neutral + bad;
  return (
    <div>
      {/* <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} /> */}
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Next anecdote"/>
      <div>
        {anecdotes[selected]}
      </div>
    </div>
  );
};

export default App;
