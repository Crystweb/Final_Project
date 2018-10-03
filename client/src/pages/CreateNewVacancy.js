import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Preloader from '../components/Preloader'
import * as _ from 'lodash'

class CreateNewVacancy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkedPositions: (this.props.updateComment && this.props.updateComment.positions) || [],
      textComment: (this.props.updateComment && this.props.updateComment.text) || undefined,
      errorText: null,
      errorCheckedPosition: null,
      successPost: null,
      commentForUpdate: this.props.updateComment || null
    }
  }

  addComment () {
    const {textComment, checkedPositions} = this.state

    if (_.isEmpty(textComment)) {
      this.setState({
        successPost: null,
        errorCheckedPosition: null,
        errorText: 'Введите текст'
      })
    } else {
      if (_.isEmpty(checkedPositions)) {
        this.setState({
          successPost: null,
          errorText: null,
          errorCheckedPosition: 'Выберите позицию'

        })
      } else {
        axios.post('/workshift/comment',
          {
            text: this.state.textComment,
            positions: this.state.checkedPositions

          })
          .then(() => {
            this.setState({
              errorText: null,
              errorCheckedPosition: null,
              textComment: '',
              checkedPositions: [],
              successPost: 'Комментарий добавлен'
            })
          })
          .then(() => { setTimeout(() => this.props.history.push('/shifts'), 1500) })
      }
    }
  }

  updateComment () {
    const {textComment, checkedPositions} = this.state

    if (_.isEmpty(textComment)) {
      this.setState({
        successPost: null,
        errorCheckedPosition: null,
        errorText: 'Введите текст'
      })
    } else {
      if (_.isEmpty(checkedPositions)) {
        this.setState({
          successPost: null,
          errorText: null,
          errorCheckedPosition: 'Выберите позицию'
        })
      } else {
        axios.put('/workshift/comment',
          {
            id: this.state.commentForUpdate.id,
            text: this.state.textComment,
            positions: this.state.checkedPositions,
            date: this.state.commentForUpdate.date
          })
          .then(() => this.setState({
            errorText: null,
            errorCheckedPosition: null,
            textComment: '',
            checkedPositions: [],
            successPost: 'Комментарий изменен'
          }))
          .then(() => { setTimeout(() => this.props.history.push('/shifts'), 1500) })
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
    } else if (!this.state.commentForUpdate) {
      return (<div className="container">
        <h3>Создать комментарий</h3><br/>
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
        <input type="button"
          value=" Добавить комментарий "
          onClick={this.addComment.bind(this)}/>
        <p>{this.state.errorCheckedPosition || this.state.errorText}</p>
        <p>{this.state.successPost}</p>
      </div>
      )
    } else {
      return (<div className="container">
        {isUpdate || <h3>Добавить комментарий</h3>}
        {isUpdate && <h3>Изменить комментарий</h3>}
        {this.props.allPositionsForComments.map(position =>
          <li key={position.id}>
            <input
              name="position"
              type="checkbox"
              checked={true && this.state.checkedPositions.includes(position.title)}
              value={position.title}
              onChange={this.setCheckedPosition.bind(this)}
            />
            {position.title}
          </li>
        )}
        <p><textarea value={this.state.textComment}
          ref={this.textInput}
          placeholder={'Введите Ваш коментарий'}
          onChange={this.addText.bind(this)}/></p>
        {isUpdate || <input type="button"
          value=" Добавить комментарий "
          onClick={this.addComment.bind(this)}/>}
        {isUpdate && <input type="button"
          value="Изменить комментарий"
          onClick={this.updateComment.bind(this)}/>
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

export default connect(mapStateToProps)(CreateNewVacancy)
