import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

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
      this.props.togglePopupLogin();
    }
  }

  render() {
    if (this.props.redirect) {
      return <Redirect to = '/home' />
    }
    return (
      <div className= {"modal-bg " + this.props.loginmodal}>
        <div className="modal-content" ref={this.setWrapperRef}>
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
              <button className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;


