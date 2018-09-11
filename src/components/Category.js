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
        this.props.updateCategory(this.props.currentCategoryObj.id,this.props.currentCategoryObj.name,this.props.currentCategoryObj.children,this.props.currentCategoryObj.bookmarkorder,this.props.currentCategoryObj.order,this.props.currentCategoryObj.categoryloc)
     }

    handleClick() {
        this.props.changeCategory(this.props.children[this.props.order])
    }

    render() {
    return (
    <div onClick={()=>this.handleClick()} draggable onDragStart = {(e) => this.onDragStart(e, this.props.index)} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, this.props.index)}} className="flex-wrap">
        <div className="category-flex-container">
            <div className="category-title">{this.props.name}</div>
        </div>
    </div>
    )
  }
}
