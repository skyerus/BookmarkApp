import React, { Component } from 'react'

import Bookmark from './Bookmark';
import AddBookmark from './AddBookmark';
import Category from './Category';

export default class Bookmarks extends Component {
  render() {
      const bookmarksCategories = this.props.order.map((order,index) => {
          if(this.props.categoryLoc[index]===0) {
            let bookmarkID = this.props.bookmarkOrder[order]
            return (
                <Bookmark 
                    edit={this.props.edit} 
                    key={this.props.bookmarks.byID[bookmarkID].orderID} 
                    name= {this.props.bookmarks.byID[bookmarkID].title} 
                    about= {this.props.bookmarks.byID[bookmarkID].about}
                    link={this.props.bookmarks.byID[bookmarkID].link} 
                    reorderBookmarks={this.props.reorderBookmarks} 
                    index={index}
                />)
        } else {
            let categoryID = this.props.children[order]
            return (
                <Category 
                    edit={this.props.edit} 
                    key={this.props.categories.byID[categoryID].orderID} 
                    name= {this.props.categories.byID[categoryID].name}  
                    reorderBookmarks={this.props.reorderBookmarks} 
                    order={order} 
                    index={index}
                />
            ) 
        }
    });

    return (
        <div className="my-container min-height my-modal bookmarks-modal not-hidden">
            <div className="bookmark-header-container">
                <div className="left-grid-btn"><button className="btn btn-dark" onClick={this.props.toggleEdit}>Edit</button></div>
                <div className="title-grid-element"><h1 className="padding-top-h1">Bookmarks</h1></div>
                <div className="save-grid-btn"><button className="btn btn-dark">Save</button></div>
            </div>
            <div className="bookmark-grid">
                <AddBookmark toggleNewBookmarkPopup={this.props.toggleNewBookmarkPopup}/>
                {bookmarksCategories}
            </div>
        </div>
    )
  }
}
