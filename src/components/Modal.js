import React from 'react'

export default (props) => {
  return (
    <div className={"my-modal " + props.style}>
      <h1>{props.title}</h1>
      <div>{props.children}</div>
    </div>
  )
}
