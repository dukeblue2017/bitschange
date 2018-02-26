import React, { Component } from 'react';
import axios from 'axios';
import PriceContainer from './Prices';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balances: {},
      prices: null,
    };
    this.fetchBalances = this.fetchBalances.bind(this);
    this.fetchPrices = this.fetchPrices.bind(this);
  }

  componentDidMount() {
    this.fetchBalances();
    this.fetchPrices();
  }

  fetchBalances() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/balances',
    }).then(res => this.setState({ balances: res.data[0] }))
      .catch(err => console.log('err', err));
  }

  fetchPrices() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/prices',
    }).then(res => this.setState({ prices: res.data }))
      .catch(err => console.log('err', err));
  }


  render() {
    return (
      <div className="main-page">
        <div className="navbar">Bitschange</div>
        {this.state.prices && <PriceContainer prices={this.state.prices} />}
      </div>
    );
  }
}

export default MainPage;
