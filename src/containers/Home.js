import React, { Component } from 'react'

import  {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {reorderBookmarks,toggleEdit,toggleNewBookmarkPopup,createBookmark,updateCategory,justCreatedBookmarkFunc,justCreatedCategoryFunc, toggleBookmarkForm, toggleCategoryForm, createCategory, changeCategory, goBack, deleteCategory, deleteBookmark} from '../actions/bookmarksActions';
import {loginHasExpired, addUserID} from '../actions/loginSignUpActions';

import Navbar from '../containers/Navbar';
import Bookmarks from '../components/Bookmarks';
import NewBookmarkPopup from '../components/NewBookmarkPopup';


class Home extends Component {

  componentDidMount() {
    if (this.props.isLoggedIn && document.cookie.length === 0) {
      this.props.loginHasExpired()
      this.props.addUserID(0)
    }
  }

  renderMainComponent() {
    if (!this.props.newBookmarkPopup) {
      return (
        <Bookmarks 
          edit = {this.props.edit} 
          toggleEdit = {this.props.toggleEdit} 
          bookmarks = {this.props.bookmarks} 
          reorderBookmarks={this.props.reorderBookmarks} 
          order= {this.props.categories[this.props.userID][this.props.currentCategory].order}
          toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}
          categoryloc={this.props.categories[this.props.userID][this.props.currentCategory].categoryloc}
          categories = {this.props.categories}
          children = {this.props.categories[this.props.userID][this.props.currentCategory].children}
          bookmarkOrder = {this.props.categories[this.props.userID][this.props.currentCategory].bookmarkorder}
          userID = {this.props.userID}
          changeCategory={this.props.changeCategory}
          currentCategoryObj = {this.props.categories[this.props.userID][this.props.currentCategory]}
          goBack={this.props.goBack}
          currentCategory={this.props.currentCategory}
          updateCategory={this.props.updateCategory}
          editBool = {this.props.editBool}
          deleteCategory = {this.props.deleteCategory}
          deleteBookmark = {this.props.deleteBookmark}
        />)
    } else {
      return (
      <NewBookmarkPopup
        toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}
        newBookmarkPopup={this.props.newBookmarkPopup}
        currentCategoryObj = {this.props.categories[this.props.userID][this.props.currentCategory]}
        currentCategory = {this.props.currentCategory}
        currentOrderID = {this.props.currentOrderID}
        createBookmark = {this.props.createBookmark}
        updateCategory = {this.props.updateCategory}
        justCreatedBookmark = {this.props.justCreatedBookmark}
        justCreatedCategory = {this.props.justCreatedCategory}
        justCreatedBookmarkFunc = {this.props.justCreatedBookmarkFunc}
        justCreatedCategoryFunc = {this.props.justCreatedCategoryFunc}
        addBookmark = {this.props.addBookmark}
        addCategory = {this.props.addCategory}
        toggleBookmarkForm = {this.props.toggleBookmarkForm}
        toggleCategoryForm={this.props.toggleCategoryForm}
        createCategory = {this.props.createCategory}
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
  bookmarks: PropTypes.object,
  reorderBookmarks: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  order: PropTypes.array,
  edit: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  newBookmarkPopup:PropTypes.bool,
  toggleNewBookmarkPopup:PropTypes.func.isRequired,
  currentCategory: PropTypes.number,
  categories: PropTypes.object,
  currentOrderID: PropTypes.number,
  createBookmark: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  justCreatedBookmark: PropTypes.bool,
  justCreatedCategory: PropTypes.bool,
  justCreatedBookmarkFunc: PropTypes.func.isRequired,
  justCreatedCategoryFunc: PropTypes.func.isRequired,
  addBookmark: PropTypes.bool,
  addCategory: PropTypes.bool,
  toggleBookmarkForm: PropTypes.func.isRequired,
  toggleCategoryForm: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  userID: PropTypes.number,
  changeCategory: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  editBool: PropTypes.bool,
  deleteCategory: PropTypes.func.isRequired,
  history : PropTypes.array,
  deleteBookmark: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  bookmarks: state.Bookmarks.bookmarks,
  order: state.Bookmarks.order,
  edit: state.Bookmarks.edit,
  isLoggedIn: state.Login.isLoggedIn,
  newBookmarkPopup: state.Bookmarks.newBookmarkPopup,
  currentCategory: state.Bookmarks.currentCategory,
  categories: state.Bookmarks.categories,
  currentOrderID: state.Bookmarks.currentOrderID,
  justCreatedBookmark: state.Bookmarks.justCreatedBookmark,
  justCreatedCategory: state.Bookmarks.justCreatedCategory,
  addBookmark: state.Bookmarks.addBookmark,
  addCategory: state.Bookmarks.addCategory,
  userID: state.Bookmarks.userID,
  editBool: state.Bookmarks.editBool,
  history: state.Bookmarks.history
})

export default connect(mapStateToProps,{reorderBookmarks,toggleEdit,toggleNewBookmarkPopup,createBookmark,updateCategory,justCreatedBookmarkFunc,justCreatedCategoryFunc, toggleBookmarkForm,toggleCategoryForm, createCategory, changeCategory, goBack,loginHasExpired, addUserID, deleteCategory, deleteBookmark})(Home)