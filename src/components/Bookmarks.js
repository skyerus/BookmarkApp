import React, { Component } from 'react'

import Bookmark from './Bookmark';

export default class Bookmarks extends Component {
  render() {
    return (
        <div className="container align-center margin-top min-height grey-container">
            <h1 className="padding-top-h1">Bookmarks</h1>
            <div className="bookmark-grid">
                <Bookmark name="My bookmark" about="This is my first bookmark!!"/>
                <Bookmark name="My bookmark" about="This is my first bookmark!!"/>
                <Bookmark name="My bookmark" about="This is my first bookmark!!"/>
                <Bookmark name="My bookmark" about="This is my first bookmark!!"/>
            </div>
        </div>
    )
  }
}
