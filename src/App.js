import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { togglePopup } from './actions/loginSignupActions'


class App extends Component {
  render() {
    return (
        <div className="App background-img">
          <div className= {"modal-bg " + this.props.modal}>
            <div className="modal-content">
              <h1>This is my modal</h1>
              <p> HELLOOOOOO </p>    
            </div>
          </div>
          <div className= {this.props.jumbotron}>
            <p className="xxsmall">`</p>
            <div className = "my-jumbotron">
              <h1>Bookmarks</h1>
              <p>A place to store all of your bookmarks</p>
              <div className="signup-buttons">
                  <button className="btn btn-dark btn-lg">Login</button>
                  <button className="btn margin-left btn-dark btn-lg" onClick = {this.props.togglePopup}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

App.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  jumbotron: PropTypes.string,
  modal: PropTypes.string
}

const mapStateToProps = state => ({
  jumbotron: state.LoginSignup.jumbotron,
  modal: state.LoginSignup.modal
})


export default connect(mapStateToProps, { togglePopup })(App);
