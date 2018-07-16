import React, { Component } from 'react'

import Bookmark from './Bookmark';

export default class Bookmarks extends Component {
  render() {
      const bookmarks = this.props.order.map((order, index) => (
        <Bookmark name= {this.props.bookmarks[order].title + this.props.bookmarks[order].id} about= "This is a bookmark" reorderBookmarks={this.props.reorderBookmarks} order={order} index={index}/>
      ));
    return (
        <div className="container align-center margin-top min-height grey-container">
            <h1 className="padding-top-h1">Bookmarks</h1>
            <div className="bookmark-grid">
                {bookmarks}
            </div>
        </div>
    )
  }
}
