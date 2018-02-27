/* eslint-disable max-len, react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinSelection: 'BTC',
      quantity: undefined,
      estimatedCost: 0,
    };
    this.placeBuy = this.placeBuy.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  placeBuy(coin, quantity) {
    axios({
      method: 'post',
      url: 'http://localhost:5000/buy',
      data: {
        coinToBuy: coin,
        quantity,
      },
    }).then((res) => {
      if (res.status === 200 && res.data === 'Order was successful') {
        alert('Order was successful.');
        this.props.loadNew();
      } else if (res.status === 200 && res.data === 'Insufficient funds') {
        alert('Insufficient funds. Your order was not processed');
      } else {
        alert('An error occurred');
      }
    })
      .catch((err) => { console.log(err); });
  }

  handleSelection(event) {
    this.setState({
      coinSelection: event.target.value,
      estimatedCost: this.state.quantity * this.props.prices[event.target.value].price,
    });
  }

  handleQuantityChange(event) {
    let estimatedCost = event.target.value * this.props.prices[this.state.coinSelection].price;
    if (Number.isNaN(estimatedCost)) {
      estimatedCost = 0;
    }
    this.setState({
      quantity: event.target.value,
      estimatedCost,
    });
  }

  handleSubmit(event) {
    if (this.state.quantity) {
      this.placeBuy(this.state.coinSelection, this.state.quantity);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="buy">
        <form className="buy-form" onSubmit={this.handleSubmit}>
          <label>
            Buy
            <input type="text" onChange={this.handleQuantityChange}></input>
            <select value={this.state.coinSelection} onChange={this.handleSelection}>
              <option value="BTC">BTC (Bitcoin)</option>
              <option value="LTC">LTC (Litecoin)</option>
              <option value="DOGE">DOGE (Dogecoin)</option>
              <option value="XMR">XMR (Monero)</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
          <div>Estimated Cost: ${(this.state.estimatedCost.toFixed(2) * 1).toLocaleString()} {this.props.prices && this.props.prices[this.state.coinSelection].denominator}</div>
      </div>
    );
  }
}

export default Buy;
