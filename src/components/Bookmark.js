import React, { Component } from 'react'

import EditBookmark from './EditBookmark'

export default class Bookmark extends Component {
    onDragStart = (ev,index) => {
        ev.dataTransfer.setData("index",index)
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, newIndex) => {
        let receivedIndex = ev.dataTransfer.getData("index");
        this.props.reorderBookmarks(newIndex,receivedIndex)
        this.props.updateCategory(this.props.currentCategoryObj.id,this.props.currentCategoryObj.name,this.props.currentCategoryObj.children,this.props.currentCategoryObj.bookmarkorder,this.props.currentCategoryObj.order,this.props.currentCategoryObj.categoryloc)
     }

    handleDelete() {
        this.props.deleteBookmark(this.props.id, this.props.bookmarkIndex)
    }
    
    handleEdit() {
        this.props.toggleEditBookmark(true, this.props.id, this.props.name, this.props.about, this.props.link, this.props.bookmarkIndex)
    }

    render() {
    if (this.props.editBookmark) {
        return (
            <EditBookmark />
        )
    } else {
        return (
        <div draggable onDragStart = {(e) => this.onDragStart(e, this.props.index)} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, this.props.index)}} className="bookmark-element" >
            <div className="bookmark-header">
                <h1>{this.props.name}</h1>
            </div>
            <div className="bookmark-about">
                <p>{this.props.about}</p>
            </div>
            <div className="btn-container">
                <a className="go-to-btn" target="_blank" href={this.props.link}>Go to</a>
                <div className={"btn-grid height-zero "+this.props.edit}>
                    <div>
                        <button className="edit-btn" onClick ={() => this.handleEdit()}>Edit</button>
                    </div>
                    <div>
                        <button className="delete-btn" onClick={() => this.handleDelete()}>Delete</button>
                    </div>
                </div>
            </div>
        </div>        
    )}
  }
}
