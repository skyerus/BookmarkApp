import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Provider } from 'react-redux';

import SignUp from './components/SignUp.js';

import store from './store.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App background-img">
          <p className="xxsmall">`</p>
          <SignUp />
        </div>
      </Provider>
    );
  }
}

export default App;
