import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tile extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    tileClick: PropTypes.func
  };

  onTileClick() {
    this.props.tileClick(this.props.x, this.props.y);
  }

  render() {
    return (
      <div className="pond__tile" onClick={this.onTileClick.bind(this)}>
        <div className="pond__tile-content" />
      </div>
    );
  }
}
