import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import axios from 'axios'

class Vacancies extends Component {
  onOpenModal = () => {
    this.setState({open: true})
  }
  onCloseModal = () => {
    this.setState({open: false})
  }
  handleSubmit = event => {
    event.preventDefault()
    axios.post(`http://localhost:9000/vacancy`, {
      position: this.state.position,
      salary: this.state.salary
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      position: '',
      salary: '',
      open: false
    }
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleSalaryChange = this.handleSalaryChange.bind(this)
  }

  handlePositionChange (event) {
    event.preventDefault()
    this.setState({position: event.target.value})
  }

  handleSalaryChange (event) {
    event.preventDefault()
    this.setState({salary: event.target.value})
  }

  render () {
    const {open} = this.state
    return (
      <div className="button-container" id="button">
        <button onClick={this.onOpenModal}>Добавить вакансию</button>
        <Modal open={open} onClose={this.onCloseModal} center
               closeOnOverlayClick={true}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Название должности:
              <input type="text" name={'position'} value={this.state.position}
                     onChange={this.handlePositionChange}/>
              Зарплата:
              <input type="number" name={'salary'} value={this.state.salary}
                     onChange={this.handleSalaryChange}/>
            </label>
            <input type="submit" value="Добавить"/>
          </form>
        </Modal>
      </div>
    )
  }
}

export default Vacancies
