import React, { Component } from 'react'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {reorderBookmarks,toggleEdit} from '../actions/bookmarksActions';
import {logout} from '../actions/loginSignUpActions';

import Navbar from '../components/Navbar';
import LoggedInNavbar from '../components/LoggedInNavbar';
import Bookmarks from '../components/Bookmarks';

function WhichNavbar(props){
  if (props.isLoggedIn){
    return <LoggedInNavbar logout={props.logout} isLoggedIn={props.isLoggedIn}/>;
  } else {
    return <Navbar/>;
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <WhichNavbar isLoggedIn={this.props.isLoggedIn} logout={this.props.logout}/>
        <Bookmarks edit = {this.props.edit} toggleEdit = {this.props.toggleEdit} bookmarks = {this.props.bookmarks} reorderBookmarks={this.props.reorderBookmarks} order= {this.props.order}/>
      </div>
    )
  }
}

Home.propTypes = {
  bookmarks: PropTypes.array,
  reorderBookmarks: PropTypes.func.isRequired,
  order: PropTypes.array,
  edit: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  bookmarks: state.Bookmarks.bookmarks,
  order: state.Bookmarks.order,
  edit: state.Bookmarks.edit,
  isLoggedIn: state.Login.isLoggedIn
})

export default connect(mapStateToProps,{reorderBookmarks,toggleEdit,logout})(Home)