/* eslint-disable max-len, react/prop-types */
import React, { Component } from 'react';

class BalanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceArr: null,
      totalValue: null,
      totalCryptoValue: null,
    };
  }


  componentDidMount() {
    this.buildArr();
    this.calculateTotalValue();
  }

  componentWillReceiveProps() {
    this.buildArr();
    this.calculateTotalValue();
  }

  buildArr() {
    if (this.props.balances) {
      const keyArr = Object.keys(this.props.balances);
      const balanceArr = keyArr.map(item => (
        <div className="balance-entry" key={item}>
          <div>{item}</div>
          <div className="balance-entry-right">{this.props.balances[item]}</div>
        </div>
      ));
      this.setState({ balanceArr });
    }
  }

  calculateTotalValue() {
    const BTCUSD = this.props.balances.BTCBalance * this.props.prices.BTC.price;
    const DOGEUSD = this.props.balances.DOGEBalance * this.props.prices.DOGE.price * this.props.prices.BTC.price;
    const LTCUSD = this.props.balances.LTCBalance * this.props.prices.LTC.price * this.props.prices.BTC.price;
    const XMRUSD = this.props.balances.XMRBalance * this.props.prices.XMR.price * this.props.prices.BTC.price;
    const totalCryptoValue = BTCUSD + DOGEUSD + LTCUSD + XMRUSD;
    const totalValue = totalCryptoValue + this.props.balances.USDBalance;
    this.setState({ totalValue, totalCryptoValue })
  }

  render() {
    return (
      <div className="balance-container">
        {this.state.balanceArr && this.state.balanceArr}
        {this.state.totalValue && <div className="total-value">
          Combined Value of All: {this.state.totalValue} USD
        </div>}
      </div>
    );
  }
}

export default BalanceContainer;
