import React, {Component} from 'react'
import '../styles/Comments.css'
import update from '../img/edit.png'
import trash from '../img/delete.png'
import routes from '../constants/routes'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ActionButtons extends Component {
  deleteComment (id) {
    if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
      axios.delete(`/workshift/comment/${id}`)
    }
  }

  render () {
    const {comment} = this.props
    return (
      <div className="comment-list__elem-buttons">
        <Link
          className="comment-list__elem-buttons-change"
          to={routes.updateComment.href + comment}>
          <img
            src={update}
            alt="#"/>
        </Link>
        <button
          style={{backgroundImage: 'url(' + trash + ')'}}
          onClick={() => this.deleteComment(comment)}
          className="comment-list__elem-buttons-delete">
        </button>
      </div>
    )
  }
}

export default ActionButtons
