import React, { Component } from 'react';

class BalanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceArr: null,
    };
  }


  componentDidMount() {
    this.buildArr();
  }

  componentWillReceiveProps() {
    this.buildArr();
  }

  buildArr() {
    if (this.props.balances) {
      console.log(this.props.balances);
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

  render() {
    return (
      <div className="balance-container">
        {this.state.balanceArr && this.state.balanceArr}
      </div>
    );
  }
}

export default BalanceContainer;
