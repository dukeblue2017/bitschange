import React, { Component } from 'react';

class BalanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceArr: null,
    };
  }

  componentWillReceiveProps() {
    if (this.props.balances) {
      // const keyArr = Object.keys(this.props.prices);
      // const priceArr = keyArr.map(item => (
      //   <div className="price-entry">
      //     {`${item}: ${this.props.prices[item].price} ${this.props.prices[item].denominator}`}
      //   </div>
      // ));
      // this.setState({ priceArr });
    }
  }

  render() {
    return (
      <div className="balance-container">
        {this.state.balanceArr && this.state.balanceArr}
      </div>
    );
  }
}

export default BalanceContainer;
