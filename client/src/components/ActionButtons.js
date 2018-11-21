import React, {Component} from 'react'
import '../styles/Comments.css'
import update from '../img/edit.png'
import trash from '../img/delete.png'
import routes from '../constants/routes'
import {Link} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import { deleteComment } from '../actions/actions'
import api from '../services/Api'
import { toastr } from 'react-redux-toastr'

class ActionButtons extends Component {
  deleteComment (id) {
    const toastrConfirmOptions = {
      onOk: () => api.deleteApi(`/workshift/comment/${id}`)
        .then(() => this.props.deleteCurrentComment(id))
        .then(() => toastr.success('Успешно', 'Комментарий удален'))
    }
    toastr.confirm('Вы уверены, что хотите удалить комментарий?', toastrConfirmOptions)
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

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCurrentComment: id => dispatch(deleteComment(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)
