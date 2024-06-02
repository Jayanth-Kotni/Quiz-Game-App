import {useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const QuizGameRoute = () => {
  const [quizQuestions, setQuizQuestions] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [timer, setTimer] = useState(15)
  const history = useHistory()
  const timerRef = useRef(null)

  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchQuizQuestions = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch('https://apis.ccbp.in/assess/questions', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.questions.map(eachQuestion => ({
          question: eachQuestion.question_text,
          optionType: eachQuestion.options_type,
          options: eachQuestion.options.map(option => ({
            id: option.id,
            text: option.text,
            url: option.image_url,
            isCorrect: option.is_correct === 'true',
          })),
          id: eachQuestion.id,
          correctOptionId: eachQuestion.options.find(
            option => option.is_correct === 'true',
          ).id,
          selectedOptionId: null,
        }))
        setQuizQuestions(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => {
        const newTimer = prevTimer - 1
        if (newTimer === 0) {
          clearInterval(timerRef.current)
        }
        return newTimer >= 0 ? newTimer : 0
      })
    }, 1000)
  }

  useEffect(() => {
    fetchQuizQuestions()
  }, [])

  useEffect(() => {
    if (apiStatus === apiStatusConstants.success) {
      startTimer()
    }
    return () => {
      clearInterval(timerRef.current)
    }
  }, [apiStatus, activeQuestionIndex])

  const renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  const handleRetry = () => {
    setQuizQuestions([])
    setActiveQuestionIndex(0)
    setSelectedAnswerIndex(-1)
    setCorrectAnswersCount(0)
    setQuizFinished(false)
    setTimer(15)
    setApiStatus(apiStatusConstants.initial)
    fetchQuizQuestions()
  }

  const renderFailureView = () => (
    <div className="quiz-page">
      <div className="quiz-page-content fail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="failure view"
          className="fail-image"
        />
        <h1 className="fail-head">Something went wrong</h1>
        <p className="fail-text">Our servers are busy please try again</p>
        <button className="next-btn" onClick={handleRetry}>
          Retry
        </button>
      </div>
    </div>
  )

  const handleAnswerSelection = answerIndex => {
    if (selectedAnswerIndex === -1) {
      setSelectedAnswerIndex(answerIndex)
      const currentQuestion = quizQuestions[activeQuestionIndex]
      const isCorrect = currentQuestion.correctOptionId === answerIndex
      if (isCorrect) {
        setCorrectAnswersCount(prevCount => prevCount + 1)
      }
      setQuizQuestions(prevQuestions =>
        prevQuestions.map((question, index) =>
          index === activeQuestionIndex
            ? {...question, selectedOptionId: answerIndex}
            : question,
        ),
      )
      clearInterval(timerRef.current)
    }
  }

  const handleNextQuestion = () => {
    if (activeQuestionIndex + 1 < quizQuestions.length) {
      setActiveQuestionIndex(prevIndex => prevIndex + 1)
      setSelectedAnswerIndex(-1)
      setTimer(15)
    } else {
      setQuizFinished(true)
      history.push({
        pathname: '/game-results',
        state: {
          correctAnswers: correctAnswersCount,
          totalQuestions: quizQuestions.length,
          questions: quizQuestions,
        },
      })
    }
  }

  useEffect(() => {
    if (timer === 0 && selectedAnswerIndex === -1) {
      handleNextQuestion()
    }
  }, [timer])

  const renderQuiz = () => {
    const currentQuestion = quizQuestions[activeQuestionIndex]
    const {question, options, optionType, correctOptionId, selectedOptionId} =
      currentQuestion

    const renderOptions = () => {
      switch (optionType) {
        case 'DEFAULT':
          return options.map((option, index) => {
            const isSelected = selectedOptionId === option.id
            const isCorrect = correctOptionId === option.id
            let optionClass = ''
            if (isSelected) {
              optionClass = isCorrect ? 'correct' : 'incorrect'
            }
            const showIcon = isSelected
            return (
              <li key={option.id} className={`option-container ${optionClass}`}>
                <button
                  className={`option ${optionClass}`}
                  onClick={() => handleAnswerSelection(option.id)}
                  type="button"
                >
                  <span>{`${String.fromCharCode(65 + index)}. `}</span>
                  {option.text}
                  {showIcon && (
                    <img
                      className="option-icon"
                      src={
                        isCorrect
                          ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                      alt={
                        isCorrect
                          ? 'correct checked circle'
                          : 'incorrect close circle'
                      }
                    />
                  )}
                </button>
              </li>
            )
          })
        case 'IMAGE':
          return options.map(option => {
            const isSelected = selectedOptionId === option.id
            const isCorrect = correctOptionId === option.id
            let optionClass = ''
            if (isSelected) {
              optionClass = isCorrect ? 'correct' : 'incorrect'
            }
            const showIcon = isSelected
            return (
              <li key={option.id} className={`option-container ${optionClass}`}>
                <div
                  className={`option ${optionClass}`}
                  onClick={() => handleAnswerSelection(option.id)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={option.url}
                    alt={option.text}
                    className="option-image"
                  />
                  {showIcon && (
                    <img
                      className="option-icon"
                      src={
                        isCorrect
                          ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                      alt={
                        isCorrect
                          ? 'correct checked circle'
                          : 'incorrect close circle'
                      }
                    />
                  )}
                </div>
              </li>
            )
          })
        case 'SINGLE_SELECT':
          return options.map(option => {
            const isSelected = selectedOptionId === option.id
            const isCorrect = correctOptionId === option.id
            const showIcon = isSelected
            return (
              <li key={option.id} className="option-container single-select">
                <input
                  type="radio"
                  id={option.id}
                  name="singleSelectOption"
                  checked={isSelected}
                  onChange={() => handleAnswerSelection(option.id)}
                  className="single-select-radio"
                />
                <label htmlFor={option.id} className="single-select-label">
                  {option.text}
                  {showIcon && (
                    <img
                      className="option-icon"
                      src={
                        isCorrect
                          ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                      alt={
                        isCorrect
                          ? 'correct checked circle'
                          : 'incorrect close circle'
                      }
                    />
                  )}
                </label>
              </li>
            )
          })
        default:
          return null
      }
    }

    return (
      <div className="quiz-page">
        <div className="quiz-page-content">
          <div className="question-time-container">
            <div className="number-container">
              <p className="q-text">
                Question{' '}
                <p className="question-number">
                  {activeQuestionIndex + 1}/{quizQuestions.length}
                </p>
              </p>
            </div>
            <div className="time-container">
              <p>{timer}</p>
            </div>
          </div>
          <div className="question-container">
            <p className="question-text">{question}</p>
          </div>
          <ul
            className={`options-container ${
              optionType === 'SINGLE_SELECT'
                ? 'single-select-options'
                : 'default-options'
            }`}
          >
            {renderOptions()}
          </ul>
          <button
            className="next-btn"
            onClick={handleNextQuestion}
            disabled={selectedAnswerIndex === -1}
          >
            {activeQuestionIndex + 1 === quizQuestions.length
              ? 'Submit'
              : 'Next Question'}
          </button>
        </div>
      </div>
    )
  }

  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderQuiz()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="quiz-page-container">{renderViews()}</div>
    </>
  )
}

export default QuizGameRoute
