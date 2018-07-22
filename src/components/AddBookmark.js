import React from 'react'
import plus from '../img/plus.svg';

export default () => {
  return (
    <div className="nested-bookmark-element">
        <h1 className="plus-header">Bookmark</h1>
        <div className="plus-container">
            <img src={plus} className="plus-img" alt="Add a new bookmark"/>
        </div>
    </div>
  )
}
