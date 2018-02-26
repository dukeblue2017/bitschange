/* eslint-disable max-len, react/prop-types */
import React, { Component } from 'react';

class Balances extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      balanceArr: null,
      totalValue: null,
    };
  }

  componentDidMount() {
    this.calculateTotalValue();
    this.buildArr();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.balances) !== JSON.stringify(this.props.balances)) {
      this.calculateTotalValue();
      this.buildArr();
    }
  }

  buildArr() {
    if (this.props.balances) {
      const keyArr = Object.keys(this.props.balances);
      const balanceArr = keyArr.map(item => {
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
    const currObj = {};
    let totalCryptoValue = 0;
    Object.keys(this.props.prices).forEach((item) => {
      currObj[item] = this.props.balances[item] * this.props.prices[item].price;
      totalCryptoValue += currObj[item];
    });
    const totalValue = totalCryptoValue + this.props.balances.USD;
    this.setState({ totalValue });
  }

  render() {
    return (
      <div className="balance-container">
        My Balances:
        {this.state.balanceArr && this.state.balanceArr}
        {this.state.totalValue &&
        <div className="total-value">
          Combined Value of All: {this.state.totalValue.toFixed(2)} USD
        </div>}
      </div>
    );
  }
}

export default Balances;
