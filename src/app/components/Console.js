import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Console extends Component {
  static propTypes = {
    result: PropTypes.string
  };

  render() {
    return (
      <div className="console">
        {this.props.result}
      </div>
    )
  }
}