import React, {Component} from 'react'
import '../styles/Comments.css'
import update from "../img/update.png";
import trash from "../img/trash.png";
import routes from "../constants/routes";
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { deleteComment } from '../actions/actions'
import axios from 'axios'

 class ActionButtons extends Component {

   deleteComment (id) {
     if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
       axios.delete(`/workshift/comment/${id}`)
         .then(() => this.props.deleteCurrentComment(id))
     }
   }

   render() {
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
           onClick={() => this.deleteComment(comment)}
           className="comment-list__elem-buttons-delete">
           <img src={trash} alt="#"/>
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
    deleteCurrentComment: (id) => {
      dispatch(deleteComment(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)

