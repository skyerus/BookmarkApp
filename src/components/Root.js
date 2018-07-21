import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from '../store';
import App from '../containers/App';
import Home from '../containers/Home';

const Root = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/bookmarks" component={Home}/>
      </Switch>
    </Router>
  </Provider>
);

export default Root