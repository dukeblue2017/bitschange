/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import MainPage from './MainPage';
import LoginPage from './Login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(username) {
    this.setState({
      isLoggedIn: true,
      username,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <MainPage username={this.state.username} /> : <LoginPage handleLogin={this.handleLogin} />}
      </div>
    );
  }
}

export default App;
