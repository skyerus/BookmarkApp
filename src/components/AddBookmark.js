import React from 'react'
import plus from '../img/plus.svg';

export default () => {
  return (
    <div className="plus-bookmark-element">
        <div className="plus-container">
            <img src={plus} className="plus-img" alt="Add a new bookmark"/>
        </div>
    </div>
  )
}
