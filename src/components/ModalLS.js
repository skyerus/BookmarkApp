import React from 'react';
import Modal from './Modal';

export default (props) => {
  return (
    <Modal title="Bookmarks" style="login-signup-modal">
      <p>A place to store all of your bookmarks</p>
      <div className="signup-buttons">
          <button className="btn btn-dark btn-lg" onClick = {props.togglePopupLogin}>Login</button>
          <button className="btn margin-left btn-dark btn-lg" onClick = {props.togglePopupSignup}>Sign Up</button>
      </div>
    </Modal>
  )
}

