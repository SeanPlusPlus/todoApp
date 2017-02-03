import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import configureStore from '../configureStore';
import Navigation from './Navigation';
import Todo from './Todo';

const store = configureStore();

export default class Root extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navigation />
          <div id="main" className="container">
            <Router history={hashHistory}>
              <Route path="/" component={Todo} />
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}
