import React, { Component } from 'react';

class PriceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceArr: null,
    };
  }

  componentWillReceiveProps() {
    if (this.props.prices) {
      const keyArr = Object.keys(this.props.prices);
      const priceArr = keyArr.map(item => (
        <div className="price-entry">
          {`${item}: ${this.props.prices[item].price} ${this.props.prices[item].denominator}`}
        </div>
      ));
      this.setState({ priceArr });
    }
  }

  render() {
    return (
      <div className="price-container">
        {this.state.priceArr && this.state.priceArr}
      </div>
    );
  }
}

export default PriceContainer;
