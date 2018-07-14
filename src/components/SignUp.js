import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      reenterpassword: ""
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
      name: this.state.name,
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
    if (this.props.signuppopup && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.togglePopupSignup();
    }
  }

  

  render() {
    return (
      <div className= {"modal-bg " + this.props.signupmodal}>
        <div className="modal-content" ref={this.setWrapperRef}>
          <h2> Create your account </h2>
          <form className="signup-form">
            <div className="form-group">
              <label>Name:</label>
              <input className= "form-control" name= "name" type="text" onChange={this.onChange} value={this.state.name}/>
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
              <button className="btn btn-primary btn-lg">Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
