import React, { Component } from 'react'

import {NavLink} from 'react-router-dom';

class LoggedInNavbar extends Component {
  render() {
    return (<div className="nav-container">
        <div className="container">
            <ul className="row-nav">
                <NavLink to="/home" activeClassName="active-link" className="row-nav-item nav-item-1">
                    Home
                </NavLink>
                <NavLink to="/about" activeClassName="active-link" className="row-nav-item">
                    About
                </NavLink>
                <NavLink to="/here" activeClassName="active-link" className="row-nav-item">
                    Prices
                </NavLink>
                <NavLink to="/somewhere" activeClassName="active-link" className="row-nav-item">
                    FAQs
                </NavLink>
                <button className="row-nav-item end-nav-item" onClick={this.props.logout}>
                    Logout
                </button>
            </ul>
        </div>
    </div>)
  }
}

export default LoggedInNavbar