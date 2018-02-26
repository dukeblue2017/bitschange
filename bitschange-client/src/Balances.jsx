/* eslint-disable max-len, react/prop-types */
import React, { Component } from 'react';

class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceArr: null,
      totalValue: null,
    };
  }

  componentDidMount() {
    this.calculateTotalValue();
    this.buildArr();
  }

  componentWillReceiveProps() {
    this.calculateTotalValue();
    this.buildArr();
  }

  buildArr() {
    if (this.props.balances) {
      const keyArr = Object.keys(this.props.balances);
      const balanceArr = keyArr.map(item => {
        console.log(item, this.props.balances[item], this.props.prices[item]);
        return (
          <div className="balance-entry" key={item}>
            <div className="which-coin">{item}</div>
            {item === 'USD' && <div className="usd-value" />}
            {item !== 'USD' && <div className="quantity">{this.props.balances[item].toFixed(5)}</div>}
            {item === 'USD' && <div className="quantity">${this.props.balances[item].toFixed(2)}</div>}
            {this.props.prices[item] && <div className="usd-value">${(this.props.balances[item] * this.props.prices[item].price).toFixed(2)}</div>}
            {/*item !== 'USD' && <div className="percentage">{(this.props.balances[item] * this.props.prices[item].price)/this.state.totalValue}</div>*/}
          </div>
        );
      });
      this.setState({ balanceArr });
    }
  }

  calculateTotalValue() {
    let BTCUSD = this.props.balances.BTC * this.props.prices.BTC.price;
    let DOGEUSD = this.props.balances.DOGE * this.props.prices.DOGE.price * this.props.prices.BTC.price;
    let LTCUSD = this.props.balances.LTC * this.props.prices.LTC.price * this.props.prices.BTC.price;
    let XMRUSD = this.props.balances.XMR * this.props.prices.XMR.price * this.props.prices.BTC.price;
    let totalCryptoValue = BTCUSD + DOGEUSD + LTCUSD + XMRUSD;
    let totalValue = totalCryptoValue + this.props.balances.USD;
    this.setState({ totalValue, totalCryptoValue });
  }

  render() {
    return (
      <div className="balance-container">
        My Balances:
        {this.state.balanceArr && this.state.balanceArr}
        {this.state.totalValue &&
        <div className="total-value">
          Combined Value of All: {this.state.totalValue} USD
        </div>}
      </div>
    );
  }
}

export default Balances;
