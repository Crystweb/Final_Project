import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { Redirect } from 'react-router-dom'
import routes from '../../constants/routes'

class CreateNewTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      redirect: false
    }
  }

  onCloseModal = () => {
    this.setState({open: false, redirect: true})
  }

  render () {
    let {open, redirect} = this.state
    if (!redirect) {
      return (
        <div className="container">
          <Modal open={open} onClose={this.onCloseModal}
            closeOnOverlayClick={true}>
          </Modal>
        </div>
      )
    } else {
      return (
        <Redirect to={routes.tasks.href}/>
      )
    }
  }
}

export default CreateNewTask
