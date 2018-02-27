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
      firstName: null,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(firstName) {
    this.setState({
      isLoggedIn: true,
      firstName,
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <MainPage firstName={this.state.firstName} /> : <LoginPage handleLogin={this.handleLogin} />}
      </div>
    );
  }
}

export default App;
