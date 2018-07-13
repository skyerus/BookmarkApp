import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { togglePopup } from '../actions/signupActions';

class SignUp extends Component {
  componentDidMount() {
    this.props.togglePopup();
    this.props.togglePopup();
  }

  render() {
    return (
    <div className = "my-jumbotron">
        <h1>Bookmarks</h1>
        <p>A place to store all of your bookmarks</p>
        <div className="signup-buttons">
            <button className="btn btn-dark btn-lg">Login</button>
            <button className="btn margin-left btn-dark btn-lg">Sign Up</button>
        </div>
    </div>
    )
  }
}

SignUp.propTypes = {
  togglePopup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  signup: state.signup.popup
})

export default connect(mapStateToProps, { togglePopup })(SignUp)
