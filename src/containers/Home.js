import React, { Component } from 'react'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {reorderBookmarks} from '../actions/bookmarksActions';

import Navbar from '../components/Navbar';
import Bookmarks from '../components/Bookmarks';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Bookmarks bookmarks = {this.props.bookmarks} reorderBookmarks={this.props.reorderBookmarks} order= {this.props.order}/>
      </div>
    )
  }
}

Home.propTypes = {
  bookmarks: PropTypes.array,
  reorderBookmarks: PropTypes.func.isRequired,
  order: PropTypes.array
}

const mapStateToProps = state => ({
  bookmarks: state.Bookmarks.bookmarks,
  order: state.Bookmarks.order
})

export default connect(mapStateToProps,{reorderBookmarks})(Home)