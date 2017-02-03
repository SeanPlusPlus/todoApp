import React, { Component } from 'react';
import { Provider } from 'react-redux';
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
          <div className="container">
            <Todo />
          </div>
        </div>
      </Provider>
    );
  }
}
