import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Signup from './components/Signup';
import Login from './components/Login';
import JumbotronLS from './components/JumbotronLS';

class App extends Component {
  render() {
    return (
      <div className="App background-img"> 
        <JumbotronLS/>
        <Signup/>
        <Login/> 
      </div>
    );
  }
}

export default App;

