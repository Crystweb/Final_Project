import React, { Component } from 'react'
import axios from 'axios'

class CreateNewComments extends Component {

  addComment () {
    axios.post()
  }
  render () {
    return (
      <div className="container">
        <h3>Добавить комментарий по смене</h3><br/>
        <p><textarea placeholder={'Введите Ваш коментарий'}></textarea></p>
        <p><select>
          <option>Смена 1</option>
          <option>Смена 2</option>
          <option>Смена 3</option>
          <option>Смена 4</option>
          <option>Смена 5</option>
          <option>Смена 6</option>
          <option>Смена 7</option>
        </select></p>
        <br/>
        <p><input type="button" value=" Добавить комментарий " onClick={this.addComment}></input></p>
      </div>
    )
  }
}

export default CreateNewComments
