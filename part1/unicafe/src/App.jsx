import { useState } from 'react'

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

  const handleNeutal = () => {
    const newCount = {
      ...feedback,
      neutral: feedback.neutral + 1,
      clicks: feedback.clicks + 1
    }
    setFeedback(newCount)
  }

  const handleBad= () => {
    const newCount = {
      ...feedback,
      bad: feedback.bad + 1,
      clicks: feedback.clicks + 1
    }
    setFeedback(newCount)
  }

  const calculateAverage = () => {
    const total = (feedback.good * 1) + (feedback.bad * -1)
    const avg = total / feedback.clicks
    return avg
  }

  const calculatePercentage = () => {
    const positive = (feedback.good / feedback.clicks) * 100
    return positive
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutal}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h1>Statistics</h1>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>All: {feedback.clicks}</p>
      <p>Average: {calculateAverage()}</p>
      <p>Positive: {calculatePercentage()}%</p>
    </div>
  )
}

export default App