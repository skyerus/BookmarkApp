import React, { Component } from 'react'

import Bookmark from './Bookmark';

export default class Bookmarks extends Component {
  render() {
      const bookmarks = this.props.order.map((order, index) => (
        <Bookmark edit={this.props.edit} key={this.props.bookmarks[order].id} name= {this.props.bookmarks[order].title + this.props.bookmarks[order].id} about= "This is a bookmark" reorderBookmarks={this.props.reorderBookmarks} order={order} index={index}/>
      ));
    return (
        <div className="container align-center margin-top min-height grey-container">
            <div className="bookmark-header-container">
                <div className="edit-grid-btn"><button className="btn btn-dark" onClick={this.props.toggleEdit}>Edit</button></div>
                <div className="title-grid-element"><h1 className="padding-top-h1">Bookmarks</h1></div>
                <div className="save-grid-btn"><button className="btn btn-dark">Save</button></div>
            </div>
            <div className="bookmark-grid">
                {bookmarks}
            </div>
        </div>
    )
  }
}
