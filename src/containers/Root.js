import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Nav from './Nav';
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
          <Nav />
          <Todo />
        </div>
      </Provider>
    );
  }
}
