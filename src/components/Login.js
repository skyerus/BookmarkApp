import React, { Component } from 'react';

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {togglePopupLogin} from '../actions/loginSignupActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  onChange(e) {
    this.setState( {[e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.createPost(user);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.props.loginpopup && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.togglePopupLogin();
    }
  }

  render() {
    return (
      <div className="modal-content" ref={this.setWrapperRef}>
        <h2> Login </h2>
        <form className="signup-form">
          <div className="form-group">
            <label>Email:</label>
            <input className= "form-control" name= "email" type="email" onChange={this.onChange} value={this.state.email}/>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className= "form-control" name= "password" type="password" onChange={this.onChange} value={this.state.password}/>
          </div>
        </form>
        <div className="align-center">
            <button className="btn btn-primary btn-lg">Login</button>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  togglePopupLogin: PropTypes.func.isRequired,
  loginpopup: PropTypes.bool,
}

const mapStateToProps = state => ({
  loginpopup: state.LoginSignup.loginpopup
})

export default connect(mapStateToProps, {togglePopupLogin})(Login);


