import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    isLoading: false,
  }

  handleStartButtonClick = () => {
    this.setState({isLoading: true})

    // Simulate an HTTP GET request
    setTimeout(() => {
      this.setState({isLoading: false})
      // Redirect to quiz page can be handled here if needed
    }, 2000) // Simulating a delay
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderHomePageContent = () => (
    <div className="home-page-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
        alt="start quiz game"
        className="home-image"
      />
      <h1 className="home-heading">
        How Many Of These Questions Do You Actually Know?
      </h1>
      <p className="home-description">
        Test yourself with these easy quiz questions and answers
      </p>
      <Link to="/quiz-game">
        <button
          className="start-button"
          type="button"
          onClick={this.handleStartButtonClick}
        >
          Start Quiz
        </button>
      </Link>
      <div className="warning-container">
        <img
          className="warning-image"
          alt="warning icon"
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
        />
        <p className="warning-text">
          All the progress will be lost, if you reload during the quiz
        </p>
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="home-page">
          {isLoading ? this.renderLoader() : this.renderHomePageContent()}
        </div>
      </div>
    )
  }
}

export default Home
