import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import * as _ from 'lodash'

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
        successPost: null,
        errorCheckedPosition: null,
        errorText: 'Введите комментарий'
      })
    } else {
      if (_.isEmpty(checkedPositions)) {
        this.setState({
          successPost: null,
          errorText: null,
          errorCheckedPosition: 'Выберите позицию'

        })
      } else {
        axios({
          url: '/workshift/comment',
          method: commentForUpdate ? 'PUT' : 'POST',
          data: commentForUpdate ? {
            id: this.state.commentForUpdate.id,
            message: this.state.textComment,
            positions: positionForComment,
            date: this.state.commentForUpdate.date
          }
            : {
              message: this.state.textComment,
              positions: positionForComment
            }
        })
          .then(() => this.setState({
            errorText: null,
            errorCheckedPosition: null,
            textComment: '',
            checkedPositions: [],
            successPost: commentForUpdate ? 'Комментарий изменен' : 'Комментарий добавлен'
          }))
          .then(() => setTimeout(() => this.props.history.push('/shifts'), 1500))
      }
    }
  }
  addText (event) {
    this.setState({textComment: event.target.value})
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
    this.setState({checkedPositions: checkedPositions})
  }

  render () {
    let isUpdate = !!this.state.commentForUpdate
    if (!this.props.allPositionsForComments) {
      return (
        <Preloader/>
      )
    } else {
      return (<div className="container">
        {this.props.allPositionsForComments.map(position => {
          const isForComment = position.pinnedToComment === true
          return (
            <div>
              {isForComment && <li key={position.id}>
                <input
                  name="position"
                  type="checkbox"
                  checked={true && this.state.checkedPositions.includes(position.title)}
                  value={position.title}
                  onChange={this.setCheckedPosition.bind(this)}
                />
                {position.title}
              </li>}
            </div>
          )
        }
        )
        }
        <p><textarea value={this.state.textComment}
          placeholder={'Введите Ваш коментарий'}
          cols="30"
          rows="10"
          onChange={this.addText.bind(this)}/></p>
        {isUpdate || <input type="button"
          value=" Добавить комментарий "
          onClick={this.commentForFactory.bind(this)}/>}
        {isUpdate && <input type="button"
          value="Изменить комментарий"
          onClick={this.commentForFactory.bind(this)}/>
        }
        <p>{this.state.errorCheckedPosition || this.state.errorText}</p>
        <p>{this.state.successPost}</p>
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

export default connect(mapStateToProps)(CreateNewComments)
