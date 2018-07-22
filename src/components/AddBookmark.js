import React from 'react'
import plus from '../img/plus.svg';

export default (props) => {
  
  return (
    <div className="plus-bookmark-element" onClick={() => props.toggleNewBookmarkPopup(true)}>
        <div className="plus-container">
            <img src={plus} className="plus-img" alt="Add a new bookmark"/>
        </div>
    </div>
  )
}
