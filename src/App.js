import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import store from './store';

import { Provider } from 'react-redux';

import Home from './components/Home';


class App extends Component {
  handleClick(e){
    this.props.togglePopup;
  };
  render() {
    return (
      <Provider store={store}>
        <div>
          <Home/>
        </div>
      </Provider>
    );
  }
}

export default App;
