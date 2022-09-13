import React from 'react'
import "../css/Popup.css";
 
const Popup = props => {
  return (
    <div className="popup-box">
        <div className="p-box">
            
            <button className="btn-close" onClick={props.handleClose}></button>
            {props.content}
        </div>
        </div>
  )
}

export default Popup