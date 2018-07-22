import React from 'react'
import plus from '../img/plus.svg';

export default () => {
  return (
    <div className="nested-grid">
        <div className="nested-bookmark-element">
            <h1 className="plus-header">Bookmark</h1>
            <img src={plus} className="plus-img" alt="Add a new bookmark" width="30%" height="30%"/>
        </div>
        <div className="nested-bookmark-element">
            <h1 className="plus-header">Category</h1>
            <img src={plus} className="plus-img" alt="Add a new bookmark" width="30%" height="30%"/>
        </div>
    </div>
  )
}
