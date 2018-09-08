import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import * as _ from 'lodash'

class CreateNewComments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkedPositions: [],
      textComment: null,
      response: null,
      error: null
    }
  }

  addComment () {
    const {textComment, checkedPositions} = this.state

    if (_.isEmpty(textComment) || _.isEmpty(checkedPositions)) {
this.setState
    }

    axios.post('/comment',
      {
        text: this.state.textComment,
        positions: this.state.checkedPositions
      })
      .then(response => this.setState({response: response.data}))
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
    console.log(this.state.textComment)
    if (!this.props.allPositionsForComments) {
      return (
        <Preloader/>
      )
    } else {
      return (<div className="container">
        <h3>Добавить комментарий по смене</h3><br/>
        {this.props.allPositionsForComments.map(position =>
          <li key={position.id}>
            <input
              name="position"
              type="checkbox"
              value={position.title}
              onChange={this.setCheckedPosition.bind(this)}
            />
            {position.title}
          </li>
        )}
        <p><textarea placeholder={'Введите Ваш коментарий'} onChange={this.addText.bind(this)}/></p>
        <p><input type="button" value=" Добавить комментарий " onClick={this.addComment.bind(this)}/></p>
      </div>
      )
    }
  }
}

const mapStateToProps = ({startData}) => {
  return {
    allPositionsForComments: startData.positions
  }
}

export default connect(mapStateToProps)(CreateNewComments)
