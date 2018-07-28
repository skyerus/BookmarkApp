import React, { Component } from 'react'

export default class Category extends Component {
    onDragStart = (ev,index) => {
        ev.dataTransfer.setData("index",index)
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, newIndex) => {
        let receivedIndex = ev.dataTransfer.getData("index");
        this.props.reorderBookmarks(newIndex,receivedIndex)
     }

    render() {
    return (
    <div draggable onDragStart = {(e) => this.onDragStart(e, this.props.index)} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, this.props.index)}} className="flex-wrap">
        <div className="category">
            {this.props.name}
        </div>
    </div>
    )
  }
}
