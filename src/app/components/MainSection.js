import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validTurtle } from '../utils/turtleHelper';
import Pond from './Pond';
import { MOVE, PLACE, REPORT } from '../constants/ActionTypes';
import { DOWN_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY } from '../constants/Turtle';
import { LEFT, RIGHT } from '../constants/Commands';
import Turtle from './Turtle';

export default class MainSection extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    turtle: PropTypes.object
  };

  getTurtle() {
    if (validTurtle(this.props.turtle)) {
      const {x, y, facing} = this.props.turtle;

      return (<Turtle x={x} y={y} facing={facing} />);
    }

    return null;
  }

  onTileClick(x, y) {
    this.props.actions.sendCommand(`${PLACE} ${x} ${y} ${this.props.turtle.facing}`);
  }

  onKeydown(e) {
    if (validTurtle(this.props.turtle)) {
      switch(e.keyCode) {
        case LEFT_KEY:
          this.props.actions.sendCommand(LEFT);
          break;
        case UP_KEY:
          this.props.actions.sendCommand(MOVE);
          break;
        case RIGHT_KEY:
          this.props.actions.sendCommand(RIGHT);
          break;
        case DOWN_KEY:
          this.props.actions.sendCommand(REPORT);
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
  }

  render() {
    const {boundX, boundY} = this.props.turtle;
    const turtle = this.getTurtle();

    return (
      <section className="main">
        <Pond rows={boundX} columns={boundY} turtle={turtle} tileClick={this.onTileClick.bind(this)} />
      </section>
    );
  }
}
