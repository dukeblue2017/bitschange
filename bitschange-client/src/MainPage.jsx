import React, { Component } from 'react';
import axios from 'axios';
import PriceContainer from './PriceContainer';
import Balances from './Balances';
import Buy from './Buy';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balances: null,
      prices: null,
    };
    this.fetchBalances = this.fetchBalances.bind(this);
    this.fetchPrices = this.fetchPrices.bind(this);
    this.loadNew = this.loadNew.bind(this);
  }

  componentDidMount() {
    this.loadNew();
  }

  fetchBalances() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/balances',
    }).then((res) => { this.setState({ balances: res.data[0] }); })
      .catch((err) => { console.log('err', err); });
  }

  fetchPrices() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/prices',
    }).then(res => this.setState({ prices: res.data }))
      .catch(err => console.log('err', err));
  }

  loadNew() {
    this.fetchPrices();
    this.fetchBalances();
  }

  render() {
    return (
      <div className="main-page">
        <div className="navbar">
          Bitschange
        </div>
        {this.state.prices && <PriceContainer prices={this.state.prices} />}
        {this.props.firstName && <div className="first-name">Welcome, {this.props.firstName}!</div>}
        {this.state.balances && <Balances balances={this.state.balances} prices={this.state.prices} />}
        {this.state.prices && <Buy loadNew={this.loadNew} prices={this.state.prices} />}
      </div>
    );
  }
}

export default MainPage;
