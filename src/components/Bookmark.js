import React from 'react'

export default (props) => {
  return (
    <div className="bookmark-element">
        <div className="bookmark-header">
            <h1>{props.name}</h1>
        </div>
        <div className="bookmark-about">
            <p>{props.about}</p>
        </div>
        <div className="btn-container">
            <button className="go-to-btn">Go to</button>
            <div className="btn-grid">
                <div>
                    <button className="edit-btn">Edit</button>
                </div>
                <div>
                    <button className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
