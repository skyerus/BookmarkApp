import React, { Component } from 'react';

import MyButton from './MyButton';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    e.preventDefault();
    this.props.login(this.state.username,this.state.password)
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
      this.props.togglePopupLogin(false);
    }
  }

  render() {
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


