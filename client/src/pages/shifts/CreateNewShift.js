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

        <li><input name="position" type="checkbox" value="manager"></input>manager</li>
        <li><input name="position" type="checkbox" value="admin"></input>admin</li>
        <li><input name="position" type="checkbox" value="managing director"></input>managing director</li>
        <br/>
        <p><textarea placeholder={'Введите Ваш коментарий'}></textarea></p>
        <br/>
        <p><input type="button" value=" Добавить комментарий " onClick={this.addComment}></input></p>
      </div>
    )
  }
}

export default CreateNewComments
