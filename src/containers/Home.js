import React, { Component } from 'react'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {reorderBookmarks,toggleEdit} from '../actions/bookmarksActions';

import Navbar from '../containers/Navbar';
import Bookmarks from '../components/Bookmarks';

class Home extends Component {
  render() {
    return (
      <div className="App background-img">
        <Navbar/>
        <Bookmarks 
          edit = {this.props.edit} 
          toggleEdit = {this.props.toggleEdit} 
          bookmarks = {this.props.bookmarks} 
          reorderBookmarks={this.props.reorderBookmarks} 
          order= {this.props.order}
        />
      </div>
    )
  }
}

Home.propTypes = {
  bookmarks: PropTypes.array,
  reorderBookmarks: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  order: PropTypes.array,
  edit: PropTypes.string,
  isLoggedIn: PropTypes.bool
}

const mapStateToProps = state => ({
  bookmarks: state.Bookmarks.bookmarks,
  order: state.Bookmarks.order,
  edit: state.Bookmarks.edit,
  isLoggedIn: state.Login.isLoggedIn
})

export default connect(mapStateToProps,{reorderBookmarks,toggleEdit})(Home)