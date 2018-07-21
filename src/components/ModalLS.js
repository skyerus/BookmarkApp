import React from 'react';
import Modal from './Modal';

export default (props) => {
  return (
    <Modal title="Bookmarks" mystyle="login-signup-modal not-hidden">
      <p>A place to store all of your bookmarks</p>
      <div className="signup-buttons">
        <button className="btn btn-dark btn-lg login-btn" onClick = {() =>props.togglePopupLogin(true)}>Login</button>
        <button className="btn margin-left btn-dark btn-lg" onClick = {() =>props.togglePopupSignup(true)}>Sign Up</button>
      </div>
    </Modal>
  )
}

