import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { addNewComment, addNewTask, deleteComment, deleteTask, updateComment } from '../actions/actions'
import { toastr } from 'react-redux-toastr'

class WsHandler extends Component {
  componentDidMount () {
    const {user, allTasks, allComments} = this.props

    const ws = new SockJS(`http://localhost:9000/ws_0001?token=Bearer ${localStorage.getItem('token')}`)
    const stompClient = Stomp.over(ws)
    stompClient.connect({}, () => {
      stompClient.subscribe('/events/task', resp => newTaskFromServer(resp.body)


        // const newTask = JSON.parse(resp.body)
        // const isClosedTask = allTasks.some(task => task.id === +newTask.id)
        // const isTaskForCurrentUser = newTask.assignee.id === user.employee.id
        // isClosedTask ? this.props.deleteClosedTask(newTask) : this.props.addTask(newTask)
        // isClosedTask && user.employee.position.pinnedToComment
        //   ? toastr.info(`Задача '${newTask.message}' в ${newTask.locations[0].title} закрыта`)
        //   : isTaskForCurrentUser && toastr.info(`Добавлена новая задача`)
      )
      stompClient.subscribe('/events/comment', resp => {
        const newComment = JSON.parse(resp.body)
        const isUpdate = allComments.some(comment => comment.id === +newComment.id)
        const currentUser = user.employee.id
        isUpdate ? this.props.commentUpdate(newComment) : this.props.addComment(newComment)
        debugger
        if (currentUser !== newComment.author.id) {
          isUpdate ? toastr.info('Комментарий изменен')
            : toastr.info('Добавлен новый комментарий')
        }
      })
      stompClient.subscribe('/events/rm/comment', resp => {
        const removedComment = JSON.parse(resp.body)
        this.props.commentDelete(removedComment.id)
      })
    })
  }

  render () {
    return (
      null
    )
  }
}

const mapStateToProps = ({comments, startData, tasks}) => {
  debugger
  return {
    user: startData.currentUser,
    allComments: comments.lastComments,
    allTasks: tasks.allTasks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: data => dispatch(addNewComment(data)),
    commentUpdate: data => dispatch(updateComment(data)),
    commentDelete: data => dispatch(deleteComment(data)),
    addTask: data => dispatch(addNewTask(data)),
    deleteClosedTask: data => dispatch(deleteTask(data)),
    newTaskFromServer: data => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WsHandler)
