import React, { Component } from 'react';

import MyButton from './MyButton';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      reenterpassword: ""
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
    this.props.signUp(this.state.username,this.state.email,this.state.password)
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
    if (this.props.signuppopup && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.togglePopupSignup(false);
    }
  }

  

  render() {
    return (
      <div className="not-hidden">
        <div ref={this.setWrapperRef} className="my-modal form-modal">
          <h2>Create your account</h2>
          <form className="signup-form">
            <div className="form-group">
              <label>Username:</label>
              <input className= "form-control" name= "username" type="text" onChange={this.onChange} value={this.state.username}/>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input className= "form-control" name= "email" type="email" onChange={this.onChange} value={this.state.email}/>
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className= "form-control" name= "password" type="password" onChange={this.onChange} value={this.state.password}/>
            </div>
            <div className="form-group">
              <label>Re-enter password:</label>
              <input className= "form-control" name= "reenterpassword" type="password" onChange={this.onChange} value={this.state.reenterpassword}/>
            </div>
          </form>
          <div className="align-center">
            <MyButton myStyle="btn btn-primary btn-lg fixed-size" text="Sign up" onClick={this.handleSubmit} isLoading={this.props.signUpIsLoading}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
