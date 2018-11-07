import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { addNewComment, updateComment } from '../actions/actions'

class WsHandler extends Component {

  componentDidMount () {
    const ws = new SockJS(`http://localhost:9000/ws_0001`)
    const stompClient = Stomp.over(ws)
    stompClient.connect({}, () => {
      stompClient.subscribe('/events/task', resp => {
        console.log(resp.body)
      })
      stompClient.subscribe('/events/comment', resp => {
        console.log(this.props.allComments)
        const newComment = JSON.parse(resp.body)
        this.props.addComment(newComment)
      })
      stompClient.s
    })
  }

  render () {
    return (
      null
    )
  }
}

const mapStateToProps = ({comments}) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: data => dispatch(addNewComment(data)),
    commentUpdate: data => dispatch(updateComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WsHandler)