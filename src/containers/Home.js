import React, { Component } from 'react'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {reorderBookmarks,toggleEdit,toggleNewBookmarkPopup} from '../actions/bookmarksActions';

import Navbar from '../containers/Navbar';
import Bookmarks from '../components/Bookmarks';
import NewBookmarkPopup from '../components/NewBookmarkPopup';


class Home extends Component {
  renderMainComponent() {
    if (!this.props.newBookmarkPopup) {
      return (
        <Bookmarks 
          edit = {this.props.edit} 
          toggleEdit = {this.props.toggleEdit} 
          bookmarks = {this.props.bookmarks} 
          reorderBookmarks={this.props.reorderBookmarks} 
          order= {this.props.order}
          toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}
        />)
    } else {
      return (
      <NewBookmarkPopup
        toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}
        newBookmarkPopup={this.props.newBookmarkPopup}
      />)
    }
  }
  render() {
    return (
      <div className="App background-img">
        <Navbar/>
        {this.renderMainComponent()}
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
  isLoggedIn: PropTypes.bool,
  newBookmarkPopup:PropTypes.bool,
  toggleNewBookmarkPopup:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  bookmarks: state.Bookmarks.bookmarks,
  order: state.Bookmarks.order,
  edit: state.Bookmarks.edit,
  isLoggedIn: state.Login.isLoggedIn,
  newBookmarkPopup: state.Bookmarks.newBookmarkPopup
})

export default connect(mapStateToProps,{reorderBookmarks,toggleEdit,toggleNewBookmarkPopup})(Home)