import React, { Component } from 'react'

import Bookmark from './Bookmark';
import AddBookmark from './AddBookmark';
import Category from './Category';

export default class Bookmarks extends Component {
  render() {
      let bookmarksCategories = this.props.order.map((order,index) => {
          if(this.props.categoryloc[index]===0) {
            let bookmarkID = this.props.bookmarkOrder[order]
            return (
                <Bookmark 
                    edit={this.props.edit} 
                    key={this.props.bookmarks[this.props.userID][bookmarkID].orderid} 
                    name= {this.props.bookmarks[this.props.userID][bookmarkID].title} 
                    about= {this.props.bookmarks[this.props.userID][bookmarkID].about}
                    link={this.props.bookmarks[this.props.userID][bookmarkID].link} 
                    reorderBookmarks={this.props.reorderBookmarks} 
                    index={index}
                    updateCategory={this.props.updateCategory}
                    currentCategoryObj = {this.props.currentCategoryObj}
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
        goback = <div className="left-grid-btn"><button className="btn btn-dark" onClick={this.props.goBack}>Back</button></div>
        title =  <div className="title-grid-element"><h1 className="padding-top-h1">{this.props.currentCategoryObj.name}</h1></div>
    } else {
        goback=""
        title = <div className="title-grid-element-wo-back"><h1 className="padding-top-h1">Home</h1></div>
    }

    return (
        <div className="my-container min-height my-modal bookmarks-modal not-hidden">
            <div className="bookmark-header-container">
                {goback}
                {title}
                <div className="edit-grid-btn"><button className="btn btn-dark" onClick={this.props.toggleEdit}>Edit</button></div>
            </div>
            <div className="bookmark-grid">
                <AddBookmark toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}/>
                {bookmarksCategories}
            </div>
        </div>
    )
  }
}
