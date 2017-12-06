import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
  command;

  static propTypes = {
    sendCommand: PropTypes.func.isRequired
  };

  handleSubmit(e) {
    e.preventDefault();
    const commandString = this.command.value;

    if (commandString.length > 0) {
      this.props.sendCommand(commandString);
      this.command.value = '';
    }
  }

  render() {
    return (
      <div className="command">
        <form className="command__form" onSubmit={this.handleSubmit.bind(this)}>
          <input className="command__input" type="text" name="command" placeholder="Enter command"
                 ref={(input) => {this.command = input;}} />
          <button className="command__submit-button" type="submit">Go</button>
        </form>
      </div>
    );
  }
}