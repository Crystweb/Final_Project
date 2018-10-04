import React from 'react'
import '../styles/Comments.css'
import update from "../img/update.png";
import trash from "../img/trash.png";

const ActionButtons = (props) => {
  return (
    <div className="comment-list__elem-buttons">
      <a className="comment-list__elem-buttons-change" href="#">
        <img src={update} alt="#"/>
      </a>
      <a className="comment-list__elem-buttons-delete" href="#">
        <img src={trash} alt="#"/>
      </a>
    </div>
  )
}

export default ActionButtons;