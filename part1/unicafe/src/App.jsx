import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({feedback}) => {
  if (feedback.all == 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={feedback.good} />
        <StatisticLine text={'neutral'} value={feedback.neutral} />
        <StatisticLine text={'bad'} value={feedback.bad} />
        <StatisticLine text={'all'} value={feedback.all} />
        <StatisticLine text={'average'} value={feedback.average} />
        <StatisticLine text={'positive'} value={feedback.positive * 100 + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const handleClick = (type) => {

    const newFeedback = {
      ...feedback,
      [type]: feedback[type] + 1,
      all: feedback.all + 1
    }
    newFeedback.average = (newFeedback.good - newFeedback.bad) / newFeedback.all;
    newFeedback.positive = newFeedback.good / newFeedback.all;

    setFeedback(newFeedback);
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text={'good'} onClick={() => handleClick('good')} />
      <Button text={'neutral'} onClick={() => handleClick('neutral')} />
      <Button text={'bad'} onClick={() => handleClick('bad')} />
      <h1>statistics</h1>
      <Statistics feedback={feedback} />
    </>
  )
}

export default App