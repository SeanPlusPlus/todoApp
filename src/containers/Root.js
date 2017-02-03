import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../configureStore';
import Todo from './Todo';
import About from './About';

const store = configureStore();

export default class Root extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={Todo} />
          <Route path="/about" component={About} />
        </Router>
      </Provider>
    );
  }
}
