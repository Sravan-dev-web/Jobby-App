import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isTrue: false,
    errorMsg: '',
  }

  onSubmitSuccesss = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      isTrue: true,
      username: '',
      password: '',
      errorMsg,
    })
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccesss(data.jwt_token)
    }
    if (response.status === 400) {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {isTrue, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.onSubmitUserDetails}>
          <div className="website-logo-img-container">
            <img
              alt="website logo"
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="input-type"
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="input-type"
            onChange={this.onChangePassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {isTrue && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
