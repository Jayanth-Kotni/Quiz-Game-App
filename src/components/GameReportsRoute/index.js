import React from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReportsRoute = () => {
  const location = useLocation()
  const {questions = [], totalQuestions = 0} = location.state || {}

  const getUnattemptedQuestions = () =>
    questions.filter(question => question.selectedOptionId === null)
  const getCorrectAnswersCount = () =>
    questions.filter(
      question => question.selectedOptionId === question.correctOptionId,
    ).length
  const getIncorrectQuestionsCount = () =>
    questions.filter(
      question =>
        question.selectedOptionId !== null &&
        question.selectedOptionId !== question.correctOptionId,
    ).length

  const renderUnattemptedQuestions = () => {
    const unattemptedQuestions = getUnattemptedQuestions()
    if (unattemptedQuestions.length === 0) {
      return (
        <div className="unattempted-questions-container">
          <h1>Attempted all the questions</h1>
        </div>
      )
    }
    return (
      <div className="unattempted-questions-container">
        <h2>Unattempted Questions</h2>
        {unattemptedQuestions.map(question => (
          <div key={question.id} className="question-container">
            <h3>{question.question}</h3>
            <div className="options-wrapper">
              <ul className="options-container">
                {question.options.map(option => (
                  <li
                    key={option.id}
                    className={`option ${
                      option.id === question.correctOptionId ? 'correct' : ''
                    }`}
                  >
                    {option.text}
                    {option.id === question.correctOptionId && (
                      <img
                        className="option-icon"
                        alt="correct checked circle"
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const CorrectAnswers = getCorrectAnswersCount()
  const IncorrectAnswers = getIncorrectQuestionsCount()
  const Unattempted = getUnattemptedQuestions().length

  return (
    <div className="page-container">
      <Header />
      <div className="report-container">
        <div className="score-board">
          <div className="score-container">
            <div className="score-circle">
              <p>
                <span className="score">{CorrectAnswers}</span>/{totalQuestions}
              </p>
            </div>
            <div className="score-details">
              <p className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="score-icon"
                />{' '}
                <span className="count">{CorrectAnswers}</span> Correct answers
              </p>
              <p className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="score-icon"
                />{' '}
                <span className="count">{IncorrectAnswers}</span> Incorrect
                answers
              </p>
              <p className="score-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="score-icon"
                />{' '}
                <span className="count">{Unattempted}</span> Unattempted answers
              </p>
            </div>
          </div>
          {renderUnattemptedQuestions()}
        </div>
      </div>
    </div>
  )
}

export default GameReportsRoute
