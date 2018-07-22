import React from 'react'

export default (props) => {
    if (props.isLoading) {
        return (
            <div>
                <button className={props.myStyle} onClick={props.onClick}>
                    <div className="spinner-1">
                    
                    </div>
                </button>
            </div>
  )} else {
      return(
            <div>
                <button className={props.myStyle} onClick={props.onClick}>
                    {props.text}
                </button>
            </div>
      )
  }
}
