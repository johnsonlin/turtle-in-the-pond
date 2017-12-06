import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MATRIX_OFFSET, MATRIX_PADDING, MATRIX_TILE_SIZE } from '../constants/Turtle';

export default class Turtle extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    facing: PropTypes.string.isRequired
  };

  render() {
    const styles = {
      left: MATRIX_PADDING + MATRIX_TILE_SIZE * this.props.x + MATRIX_OFFSET * this.props.x,
      bottom: MATRIX_PADDING + MATRIX_TILE_SIZE * this.props.y + MATRIX_OFFSET * this.props.y
    };

    const className = classNames('turtle', `turtle--${this.props.facing.toLowerCase()}`);

    return (
      <div className={className} style={styles}>
        <img className="turtle__image" src="img/turtle.svg" alt="turtle" />
      </div>
    );
  }
}