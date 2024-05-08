import { useState } from 'react'

const WarningNoFeedback = () => {
  return <p>No feedback given</p>
}

const StatisticLine = ({ text, value }) => {
  return <p>{text}: {value}</p>
}

const Staticts = ({ good, bad, clicks, neutral }) => {
  const calculateAverage = () => {
    const total = (good * 1) + (bad * -1)
    const avg = total / clicks
    return avg
  }

  const calculatePercentage = () => {
    const positive = (good / clicks) * 100
    return positive
  }

  return (
    <div>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="all" value={clicks} />
      <StatisticLine text="average" value={calculateAverage()} />
      <StatisticLine text="positive" value={`${calculatePercentage()} %`} />
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    clicks: 0,
  })

  const handleGood = () => {
    const newCount = {
      ...feedback,
      good: feedback.good + 1,
      clicks: feedback.clicks + 1
    }
    setFeedback(newCount)
  }

  const handleNeutral = () => {
    const newCount = {
      ...feedback,
      neutral: feedback.neutral + 1,
      clicks: feedback.clicks + 1
    }
    setFeedback(newCount)
  }

  const handleBad = () => {
    const newCount = {
      ...feedback,
      bad: feedback.bad + 1,
      clicks: feedback.clicks + 1
    }
    setFeedback(newCount)
  }

  const Button = ({ onClick, text }) => {
    return (
      <button onClick={onClick}>{text}</button>
    )
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      {feedback.clicks === 0 ? (
        <WarningNoFeedback />
      ) : (
        <Staticts good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} clicks={feedback.clicks} />
      )}
    </div>
  )
}

export default App