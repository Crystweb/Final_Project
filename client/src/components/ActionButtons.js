import React, {Component} from 'react'
import '../styles/Comments.css'
import update from "../img/edit.png";
import trash from "../img/delete.png";
import routes from "../constants/routes";
import {Link} from "react-router-dom";
import {getLastShift} from "../utils/utils";
import connect from "react-redux/es/connect/connect";
import {addShift} from "../actions/actions";
import axios from 'axios'

 class ActionButtons extends Component {

   deleteComment (id) {
     if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
       axios.delete(`/workshift/comment/${id}`)
         .then(() => getLastShift(data => {
           this.props.addShift(data)
         }))
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
           style={{backgroundImage: "url("+ trash + ")"}}
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
    addShift: (data) => {
      dispatch(addShift(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)

