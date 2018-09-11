import React, { Component } from 'react'

import Bookmark from './Bookmark';
import AddBookmark from './AddBookmark';
import Category from './Category';

import settings from '../img/settings.svg'

export default class Bookmarks extends Component {
    handleDeleteCategory() {
        this.props.deleteCategory(this.props.currentCategoryObj.id, this.props.currentCategory)
        .then(() => {
            for(let i=this.props.currentCategory; i< this.props.categories[this.props.userID].length; i++) {
                this.props.updateCategory(this.props.categories[this.props.userID][i].id,this.props.categories[this.props.userID][i].name,this.props.categories[this.props.userID][i].children,this.props.categories[this.props.userID][i].bookmarkorder,this.props.categories[this.props.userID][i].order,this.props.categories[this.props.userID][i].categoryloc)
            }
        })
    }

  render() {
      if (this.props.bookmarkWasJustDeleted) {
        for(let i=this.props.currentCategory; i< this.props.categories[this.props.userID].length; i++) {
            if (i===this.props.categories[this.props.userID].length-1) {
                this.props.updateCategory(this.props.categories[this.props.userID][i].id,this.props.categories[this.props.userID][i].name,this.props.categories[this.props.userID][i].children,this.props.categories[this.props.userID][i].bookmarkorder,this.props.categories[this.props.userID][i].order,this.props.categories[this.props.userID][i].categoryloc)
                .then(()=>this.props.bookmarkJustDeleted(false))
            } else {
                this.props.updateCategory(this.props.categories[this.props.userID][i].id,this.props.categories[this.props.userID][i].name,this.props.categories[this.props.userID][i].children,this.props.categories[this.props.userID][i].bookmarkorder,this.props.categories[this.props.userID][i].order,this.props.categories[this.props.userID][i].categoryloc)
            }
        }
      }
      let bookmarkIndex = -1;
      let bookmarksCategories = this.props.order.map((order,index) => {
          if(this.props.categoryloc[index]===0) {
            let bookmarkID = this.props.bookmarkOrder[order]
            bookmarkIndex += 1;
            return (
                <Bookmark 
                    edit={this.props.edit} 
                    id = {this.props.bookmarks[this.props.userID][bookmarkID].id} 
                    key={this.props.bookmarks[this.props.userID][bookmarkID].orderid} 
                    name= {this.props.bookmarks[this.props.userID][bookmarkID].title} 
                    about= {this.props.bookmarks[this.props.userID][bookmarkID].about}
                    link={this.props.bookmarks[this.props.userID][bookmarkID].link} 
                    reorderBookmarks={this.props.reorderBookmarks} 
                    bookmarkIndex={bookmarkIndex}
                    index={index}
                    updateCategory={this.props.updateCategory}
                    currentCategoryObj = {this.props.currentCategoryObj}
                    deleteBookmark = {this.props.deleteBookmark}
                    toggleEditBookmark = {this.props.toggleEditBookmark}
                    editBookmark = {this.props.editBookmark}
                />)
        } else {
            let categoryID = this.props.children[order]
            return (
                <Category 
                    edit={this.props.edit} 
                    key={this.props.categories[this.props.userID][categoryID].orderid} 
                    name= {this.props.categories[this.props.userID][categoryID].name}  
                    reorderBookmarks={this.props.reorderBookmarks} 
                    order={order} 
                    index={index}
                    changeCategory = {this.props.changeCategory}
                    currentCategoryObj = {this.props.currentCategoryObj}
                    children = {this.props.children}
                    updateCategory={this.props.updateCategory}
                />
            ) 
        }
    });
    let goback;
    let title;
    if (this.props.currentCategory!==0) {
        goback = <div className="left-grid-btn"><button className="btn btn-dark btn-small" onClick={this.props.goBack}>Back</button></div>
        title =  <div className="title-grid-element"><h1 className="padding-top-h1">{this.props.currentCategoryObj.name}</h1></div>
    } else {
        goback=""
        title = <div className="title-grid-element-wo-back"><h1 className="padding-top-h1">Home</h1></div>
    }
    let edit;
    let deleteCategory;
    if (this.props.editBool && this.props.currentCategory!==0) {
        edit = <div className="edit-grid-btn"><button className="btn btn-dark btn-small" onClick= {()=>this.props.toggleEditCategory(true)}>Edit</button></div>
        deleteCategory = <div className="edit-grid-btn"><button className="btn btn-danger btn-small" onClick={() => this.handleDeleteCategory()}>Delete</button></div>
    }

    return (
        <div className="my-container min-height my-modal bookmarks-modal not-hidden">
            <div className="bookmark-header-container">
                {goback}
                {title}
                {edit}
                {deleteCategory}
                <div className="edit-grid-btn"><button className="settings-btn" onClick={this.props.toggleEdit}><img className="settings-icon" src={settings} alt="Settings"/></button></div>
            </div>
            <div className="bookmark-grid">
                <AddBookmark toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}/>
                {bookmarksCategories}
            </div>
        </div>
    )
  }
}
