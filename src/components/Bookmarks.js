import React, { Component } from 'react'

import Bookmark from './Bookmark';
import AddBookmark from './AddBookmark';

export default class Bookmarks extends Component {
  render() {
      const bookmarks = this.props.order.map((order, index) => (
        <Bookmark 
            edit={this.props.edit} 
            key={this.props.bookmarks[order].id} 
            name= {this.props.bookmarks[order].title + this.props.bookmarks[order].id} 
            about= "This is a bookmark iyhfi ues aieuh eiu hefi huef hiue fhiu efs hiue sfi ue sfaf  ssfe ffefea ffaf afa faa afaf afaf af" 
            reorderBookmarks={this.props.reorderBookmarks} 
            order={order} 
            index={index}
        />
      ));
    return (
        <div className="my-container min-height my-modal bookmarks-modal">
            <div className="bookmark-header-container">
                <div className="left-grid-btn"><button className="btn btn-dark" onClick={this.props.toggleEdit}>Edit</button></div>
                <div className="title-grid-element"><h1 className="padding-top-h1">Bookmarks</h1></div>
                <div className="save-grid-btn"><button className="btn btn-dark">Save</button></div>
            </div>
            <div className="bookmark-grid">
                <AddBookmark/>
                {bookmarks}
            </div>
        </div>
    )
  }
}
