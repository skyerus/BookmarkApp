import React from 'react'

import {NavLink} from 'react-router-dom';

export default () => {
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
            </ul>
        </div>
    </div>
  )
}
