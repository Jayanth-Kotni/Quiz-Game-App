import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-input">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          className="user-input"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {showPassword, password} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    return (
      <>
        <label htmlFor="password" className="label-input">
          PASSWORD
        </label>
        <input
          type={passwordType}
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          className="user-input"
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.onClickShowPassword}
            className="checkbox-input"
          />
          <label htmlFor="checkbox" className="show-password-label">
            Show Password
          </label>
        </div>
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  OnSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const LoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.OnSubmitForm}>
          <div className="logo-container">
            <img
              className="logo-img"
              src="https://res.cloudinary.com/df1uli235/image/upload/v1714979567/quiz_game_logo_zq8zsu.svg"
              alt="login website logo"
            />
            <h1 className="login-logo-text">NXT Quiz</h1>
          </div>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="submit-error">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
