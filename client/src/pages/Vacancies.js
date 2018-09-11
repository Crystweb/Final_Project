import React, {Component, Fragment} from 'react'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import VacanciesList from "../components/VacanciesList";

class Vacancies extends Component {
  onOpenModal = () => {
    this.setState({open: true})
  }
  onCloseModal = () => {
    this.setState({open: false})
  }
  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: '/vacancy',
      method: 'POST',
      data: {
        vacancy: {
          position: this.state.position,
          info: this.state.info,
          salary: this.state.salary
        }
      }

    }).then(() => this.setState({open: false}))
  }

  constructor (props) {
    super(props)
    this.state = {
      position: '',
      salary: '',
      info: '',
      open: false
    }
    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleSalaryChange = this.handleSalaryChange.bind(this)
    this.handleInfoChange = this.handleInfoChange.bind(this)
  }

  handlePositionChange (event) {
    event.preventDefault()
    this.setState({position: event.target.value})
  }

  handleSalaryChange (event) {
    event.preventDefault()
    this.setState({salary: event.target.value})
  }

  handleInfoChange (event) {
    event.preventDefault()
    this.setState({info: event.target.value})
  }

    render() {
        const {open} = this.state;
        return (
            <Fragment>
                <div className="button-container" id="button">
                    <button onClick={this.onOpenModal}>Добавить вакансию</button>
                    <Modal open={open} onClose={this.onCloseModal} center
                           closeOnOverlayClick={true}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Название должности:
                                <input type="text" name={"position"} value={this.state.position}
                                       onChange={this.handlePositionChange}/>
                                Зарплата:
                                <input type="text" name={"salary"} value={this.state.salary}
                                       onChange={this.handleSalaryChange}/>
                                <br/>
                                <textarea placeholder={'Введите Ваш коментарий'} name={"info"} value={this.state.info}
                                          onChange={this.handleInfoChange}/>
                            </label>
                            <input type="submit" value="Добавить" />
                        </form>
                    </Modal>
                </div>
                <VacanciesList/>
            </Fragment>
        )
    }
}

export default Vacancies
