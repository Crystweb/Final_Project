import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import * as _ from 'lodash'
import { addNewComment, updateComment } from '../../actions/actions'

class CreateNewComments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkedPositions: (this.props.updateComment && this.props.updateComment.positions.map(position => {
        return position.title
      })) || [],
      textComment: (this.props.updateComment && this.props.updateComment.message) || undefined,
      errorText: null,
      errorCheckedPosition: null,
      successPost: null,
      commentForUpdate: this.props.updateComment || null
    }
  }

  commentForFactory () {
    const {textComment, checkedPositions, commentForUpdate} = this.state
    const allPositionsForComments = this.props.allPositionsForComments
    let positionForComment = checkedPositions.map(positionForComment => {
      return allPositionsForComments.find(position => position.title === positionForComment)
    })
    if (_.isEmpty(textComment)) {
      this.setState({
        errorText: 'Введите комментарий'
      })
    }
    if (_.isEmpty(checkedPositions)) {
      this.setState({
        errorCheckedPosition: 'Выберите позицию'
      })
    }
    if (!_.isEmpty(textComment) && !_.isEmpty(checkedPositions)) {

      const data = commentForUpdate ?
        {
          id: this.state.commentForUpdate.id,
          message: this.state.textComment,
          positions: positionForComment,
          date: this.state.commentForUpdate.date
        } : {
          message: this.state.textComment,
          positions: positionForComment,
          date: new Date()
        }
      axios({
        url: '/workshift/comment',
        method: commentForUpdate ? 'PUT' : 'POST',
        data: data
      })
        .then(response => commentForUpdate ? this.props.commentUpdate(response.data) : this.props.addComment(response.data))
        .then(() => this.setState({
          errorText: null,
          errorCheckedPosition: null,
          textComment: '',
          checkedPositions: [],
          successPost: commentForUpdate ? 'Комментарий изменен' : 'Комментарий добавлен'
        }))
        .then(() => this.props.history.push('/shifts'))
    }
  }

  addText (event) {
    this.setState({
      textComment: event.target.value,
      errorText: null
    })
  }

  setCheckedPosition (event) {
    let currentCheckedPosition = event.target.value
    let checkedPositions = this.state.checkedPositions
    if (checkedPositions.includes(currentCheckedPosition)) {
      let positionIndex = checkedPositions.indexOf(currentCheckedPosition)
      let firstPartPositionsArray = checkedPositions.slice(0, positionIndex)
      let secondPartPositionsArray = checkedPositions.slice(positionIndex + 1)
      checkedPositions = firstPartPositionsArray.concat(secondPartPositionsArray)
    } else {
      checkedPositions.push(event.target.value)
    }
    this.setState({
      checkedPositions: checkedPositions,
      errorCheckedPosition: null
    })
  }

  render () {
    const {checkedPositions, textComment, errorText, errorCheckedPosition, successPost, commentForUpdate} = this.state
    let isUpdate = !!commentForUpdate
    if (!this.props.allPositionsForComments) {
      return (
        <Preloader/>
      )
    } else {
      return (<div className="container">
          {this.props.allPositionsForComments.map(position => {
              const isForComment = position.pinnedToComment === true
              return (
                <ul>
                  {isForComment && <li key={position.id}>
                    <input
                      name="position"
                      type="checkbox"
                      checked={true && checkedPositions.includes(position.title)}
                      value={position.title}
                      onChange={this.setCheckedPosition.bind(this)}
                    />
                    {position.title}
                  </li>}
                  {errorCheckedPosition && <p>{errorCheckedPosition}</p>}
                </ul>
              )
            }
          )
          }
          <textarea
            name='commentField'
            value={textComment}
            placeholder={'Введите Ваш коментарий'}
            cols="30"
            rows="10"
            onChange={this.addText.bind(this)}/>
          {errorText && <label htmlFor='commentField'>{errorText}</label>}
          {isUpdate || <input type="button"
                              value=" Добавить комментарий "
                              onClick={this.commentForFactory.bind(this)}/>}
          {isUpdate && <input type="button"
                              value="Изменить комментарий"
                              onClick={this.commentForFactory.bind(this)}/>
          }
          <p>{successPost}</p>
        </div>
      )
    }
  }
}

const mapStateToProps = ({comments, startData}, ownProps) => {
  if (comments.lastComments) {
    return {
      allPositionsForComments: startData.positions,
      updateComment: comments.lastComments.find(comment => comment.id === +ownProps.match.params.commentId)
    }
  } else {
    return {
      allPositionsForComments: startData.positions
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (data) => {
      dispatch(addNewComment(data))
    },
    commentUpdate: (data) => {
      dispatch(updateComment(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewComments)
