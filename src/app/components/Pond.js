import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';

import Tile from './Tile';

export default class Pond extends Component {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    turtle: PropTypes.object,
    tileClick: PropTypes.func
  };

  render() {
    const tiles = range(this.props.rows).map((y) => {
      return (
        <div key={y} className="pond__row">
          {range(this.props.columns).map(
            (x) => <Tile key={x} x={x} y={this.props.rows - 1 - y} tileClick={this.props.tileClick} />
          )}
        </div>
      )
    });

    return (
      <div className="pond">
        <div className="pond__matrix">
          {tiles}
        </div>
        {this.props.turtle}
      </div>
    );
  }
}
