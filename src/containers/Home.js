import React, { Component } from 'react'

import Navbar from '../components/Navbar';
import Bookmarks from '../components/Bookmarks';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Bookmarks/>
      </div>
    )
  }
}
