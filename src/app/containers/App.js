import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainSection from '../components/MainSection';
import * as actions from '../actions';
import Command from '../components/Command';
import Console from '../components/Console';

const App = ({turtle, actions}) => (
  <div className="app-container">
    <h1 className="app-container__title">Turtle in the Pond</h1>
    <Command sendCommand={actions.sendCommand} actions={actions}/>
    <MainSection actions={actions} turtle={turtle} />
    <Console result={turtle.status} />
  </div>
);

App.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  turtle: state.turtle
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
