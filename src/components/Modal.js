import React from 'react'

export default (props) => {
  return (
    <div className={"my-modal " + props.mystyle}>
      <h1>{props.title}</h1>
      <div>{props.children}</div>
    </div>
  )
}
