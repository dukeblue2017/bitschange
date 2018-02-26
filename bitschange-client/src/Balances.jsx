/* eslint-disable max-len, react/prop-types */
import React, { Component } from 'react';

class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceArr: null,
      totalValue: null,
      balanceObj: {
        USD: { balance: this.props.balances.USD, usdValue: this.props.balances.USD, price: 1, denominator: 'USD'},
        BTC: { balance: this.props.balances.BTC, usdValue: this.props.balances.BTC * this.props.prices.BTC.price, price: this.props.prices.BTC.price, denominator: 'USD'},
        LTC: { balance: this.props.balances.LTC, usdValue: this.props.balances.LTC * this.props.prices.LTC.price * this.props.prices.BTC.price, price: this.props.prices.LTC.price, denominator: 'BTC'},
        DOGE: { balance: this.props.balances.DOGE, usdValue: this.props.balances.DOGE * this.props.prices.DOGE.price * this.props.prices.BTC.price, price: this.props.prices.DOGE.price, denominator: 'BTC'},
        XMR: { balance: this.props.balances.XMR, usdValue: this.props.balances.XMR * this.props.prices.XMR.price * this.props.prices.BTC.price, price: this.props.prices.XMR.price, denominator: 'BTC'}
      },
    };
    console.log(this.state);
  }


  componentWillMount() {
    this.calculateTotalValue();
    this.buildArr();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.balances) !== JSON.stringify(this.props.balances)) {
      this.setState({
        balanceObj: {
          USD: { balance: this.props.balances.USD, usdValue: this.props.balances.USD, price: 1, denominator: 'USD'},
          BTC: { balance: this.props.balances.BTC, usdValue: this.props.balances.BTC * this.props.prices.BTC.price, price: this.props.prices.BTC.price, denominator: 'USD'},
          LTC: { balance: this.props.balances.LTC, usdValue: this.props.balances.LTC * this.props.prices.LTC.price * this.props.prices.BTC.price, price: this.props.prices.LTC.price, denominator: 'BTC'},
          DOGE: { balance: this.props.balances.DOGE, usdValue: this.props.balances.DOGE * this.props.prices.DOGE.price * this.props.prices.BTC.price, price: this.props.prices.DOGE.price, denominator: 'BTC'},
          XMR: { balance: this.props.balances.XMR, usdValue: this.props.balances.XMR * this.props.prices.XMR.price * this.props.prices.BTC.price, price: this.props.prices.XMR.price, denominator: 'BTC'}
        },
        totalValue: this.state.balanceObj.USD.usdValue + this.state.balanceObj.BTC.usdValue + this.state.balanceObj.LTC.usdValue + this.state.balanceObj.DOGE.usdValue + this.state.balanceObj.XMR.usdValue,
      });
      this.buildArr();
    }
  }

  buildArr() {
    if (this.props.balances) {
      const keyArr = Object.keys(this.state.balanceObj);
      const balanceArr = keyArr.map( (item) => {
        return (
          <div className="balance-entry" key={item}>
            <div className="which-coin">{item}</div>
            <div className="quantity">{this.state.balanceObj[item].balance.toFixed(5)}</div>
            <div className="usd-value">${this.state.balanceObj[item].usdValue.toFixed(2)}</div>
          </div>
        );
      });
      this.setState({ balanceArr });
    }
  }

  calculateTotalValue() {
    const totalValue = this.state.balanceObj.USD.usdValue + this.state.balanceObj.BTC.usdValue + this.state.balanceObj.LTC.usdValue + this.state.balanceObj.DOGE.usdValue + this.state.balanceObj.XMR.usdValue;
    this.setState({ totalValue });
  }

  render() {
    return (
      <div className="balance-container">
        My Balances:
        {this.state.balanceArr}
        {this.state.totalValue &&
        <div className="total-value">
          Combined Value of All: {this.state.totalValue.toFixed(2)} USD
        </div>}
      </div>
    );
  }
}

export default Balances;
