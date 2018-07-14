import React, { Component } from 'react';

class JumbotronLS extends Component {
  render() {
    return (
      <div className= {this.props.jumbotron}>
        <p className="xxsmall">`</p>
        <div className = "my-jumbotron">
            <h1>Bookmarks</h1>
            <p>A place to store all of your bookmarks</p>
            <div className="signup-buttons">
                <button className="btn btn-dark btn-lg" onClick = {this.props.togglePopupLogin}>Login</button>
                <button className="btn margin-left btn-dark btn-lg" onClick = {this.props.togglePopupSignup}>Sign Up</button>
            </div>
        </div>
      </div>
    );
  }
}

export default JumbotronLS;
