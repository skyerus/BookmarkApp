import React from 'react'

import {NavLink} from 'react-router-dom';

export default (props) => {
  return (
    <div className="nav-container">
        <div className="container">
            <ul className="row-nav">
                <NavLink to="/home" activeClassName="active-link" className="row-nav-item nav-item-1">
                    Home
                </NavLink>
                <NavLink to="/home" activeClassName="selected" className="row-nav-item">
                    About
                </NavLink>
                <NavLink to="/home" activeClassName="selected" className="row-nav-item">
                    Prices
                </NavLink>
                <NavLink to="/home" activeClassName="selected" className="row-nav-item">
                    FAQs
                </NavLink>
                {props.isLoggedIn ? <button className="row-nav-item end-nav-item" onClick={props.logout}>
                    Logout
                </button> : !props.loginPopup ? <button className="row-nav-item end-nav-item" onClick={props.togglePopupLogin}>
                    Login
                </button> : null }
            </ul>
        </div>
    </div>
  )
}
