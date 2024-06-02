import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameResultRoute = () => {
  const location = useLocation()
  const history = useHistory()
  const {
    correctAnswers = 0,
    totalQuestions = 10,
    questions = [],
  } = location.state || {}

  const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(0)
  const isWinner = correctPercentage >= 60

  const handleReport = () => {
    history.push({
      pathname: '/game-report',
      state: {
        correctAnswers,
        totalQuestions,
        questions,
      },
    })
  }

  return (
    <div className="page-container">
      <Header />
      <div className="background">
        <div
          className={`results-container ${
            isWinner ? 'congrats-background' : ''
          }`}
        >
          {isWinner ? (
            <div className="result">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                alt="won"
                className="won-image"
              />
              <h1 className="congrats-text">Congrats</h1>
              <h1 className="percentage-text">
                {correctPercentage}% Correctly Answered
              </h1>
              <p className="success-text">Quiz completed successfully</p>
              <p className="score-text">
                You attempted {correctAnswers} out of {totalQuestions} questions
                as correct
              </p>
              <button className="report-button" onClick={handleReport}>
                Report
              </button>
            </div>
          ) : (
            <div className="result">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                alt="lose"
                className="lose-image"
              />
              <h1 className="congrats-text">You lose</h1>
              <h1 className="percentage-text">
                {correctPercentage}% Correctly Answered
              </h1>
              <p className="score-text">
                You attempted {correctAnswers} out of {totalQuestions} questions
                as correct
              </p>
              <button className="report-button" onClick={handleReport}>
                Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameResultRoute
