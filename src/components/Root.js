import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react';

import {persistor,store} from '../store';

import App from '../containers/App';
import Home from '../containers/Home';

const Root = () => {
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/bookmarks" component={Home}/>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
  );
};

export default Root