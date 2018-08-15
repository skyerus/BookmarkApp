import React, { Component } from 'react';

import MyButton from './MyButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      missingFields: false
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  onChange(e) {
    this.setState( {[e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    this.setState({missingFields:false})
    this.props.loginHasErroredFunc(false, 403)
    this.props.loginHasErroredFunc(false, 404)
    e.preventDefault();
    if (this.state.password!=="" && this.state.username!=="") {
      this.props.login(this.state.username,this.state.password)
    }
    if (this.state.password==="" || this.state.username==="") {
      this.setState({missingFields:true})
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    this.props.loginHasErroredFunc(false, 403)
    this.props.loginHasErroredFunc(false, 404)
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.props.loginpopup && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.togglePopupLogin(false);
    }
  }

  render() {
    let error;
    let loginError;
    if (this.state.missingFields) {
      error = <p className="red-text">Please fill out all fields</p>
    }
    if (this.props.userNoExists) {
      loginError = <p className="red-text">Could not find an account with that username</p>
    }
    if (this.props.incorrectPassword) {
      loginError = <p className="red-text">Incorrect password</p>
    }
    return (
      <div className= "not-hidden">
        <div className="my-modal form-modal" ref={this.setWrapperRef}>
          <h2> Login </h2>
          <form className="signup-form">
            <div className="form-group">
              <label>Username:</label>
              <input className= "form-control" name= "username" type="text" onChange={this.onChange} value={this.state.username}/>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className= "form-control" name= "password" type="password" onChange={this.onChange} value={this.state.password}/>
              {error}
              {loginError}
            </div>
          </form>
          <div className="align-center">
              <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Login" onClick={this.handleSubmit} isLoading={this.props.loginIsLoading}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;


