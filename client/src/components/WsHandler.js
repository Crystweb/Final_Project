import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { addNewComment, addNewTask, deleteTask, updateComment } from '../actions/actions'

class WsHandler extends Component {
  componentDidMount () {
    const ws = new SockJS(`http://localhost:9000/ws_0001`)
    const stompClient = Stomp.over(ws)
    stompClient.connect({}, () => {
      stompClient.subscribe('/events/task', resp => {
        const newTask = JSON.parse(resp.body)
        const isClosedTask = this.props.allTasks.some(task => task.id === +newTask.id)
        isClosedTask ? this.props.deleteClosedTask(newTask) : this.props.addTask(newTask)
      })
      stompClient.subscribe('/events/comment', resp => {
        const newComment = JSON.parse(resp.body)
        const isUpdate = this.props.allComments.some(comment => comment.id === +newComment.id)
        isUpdate ? this.props.commentUpdate(newComment) : this.props.addComment(newComment)
      })
    })
  }

  render () {
    return (
      null
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: data => dispatch(addNewComment(data)),
    commentUpdate: data => dispatch(updateComment(data)),
    addTask: data => dispatch(addNewTask(data)),
    deleteClosedTask: data => dispatch(deleteTask(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WsHandler)
