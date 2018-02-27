/* eslint-disable max-len */
import React, { Component } from 'react';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => {
        if (res.data.token) {
          axios.defaults.headers.common.Authorization = res.data.token;
          // alert('Correct! You have logged in');
          this.props.handleLogin(this.state.username);
        } else if (res.data.code === 'ECONNREFUSED') {
          alert('An error occurred. Please check environment variables');
        } else if (res.data === 'Incorrect password'){
          alert('Incorrect login credentials. Please try again.');
        } else {
          alert('An error occurred');
        }
      })
      .catch(err => console.log(err));
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          Bitschange
          <form className="login-form" onSubmit={this.handleSubmit}>
            <label className="login-label">
              Username:
              <input className="login-input" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            </label>
            <label className="login-label">
              Password:
              <input className="login-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </label>
            <input type="submit" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
