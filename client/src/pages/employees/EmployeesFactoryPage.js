import React, {Component, Fragment} from 'react'

import axios from 'axios'
import Modal from "react-responsive-modal";
import connect from "react-redux/es/connect/connect";

class EmployeesFactoryPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`/employee`, {
      position: this.props.positions.find(p => p.id === +this.positionId.value),
      forename: this.forename.value,
      surname: this.surname.value,
      patronymic: this.patronymic.value,
      phoneNumber: this.phoneNumber.value,
      info: this.info.value
    })
      .then((res) => this.setState({open: false, resData: res.data}))
      // .then(() => { setTimeout(() => this.props.history.push('/employee'), 1500) })
      }

  onOpenModal = () => {
    this.setState({open: true})
  }

  onCloseModal = () => {
    this.setState({open: false})
  }

  render() {

    const {position, open} = this.state;
    const {positions} = this.props;

    return (
      <Fragment>
        <div className="button-container" id="button">
          <button onClick={this.onOpenModal}>Добавить сотрудника</button>
          <Modal open={open} onClose={this.onCloseModal} center
                 closeOnOverlayClick={true}>
            <form onSubmit={this.handleSubmit}>
              <label>
                Название должности:
                <select defaultValue={position} ref={(input) => this.positionId = input}>
                  {positions.map(position =>
                    <option key={position.id} value={position.id}>
                      {position.title}
                    </option>)}
                </select>
                Forename:
                <input type="text" ref={(input) => this.forename = input}/>
                Surname:
                <input type="text" ref={(input) => this.surname = input}/>
                Patronymic:
                <input type="text" ref={(input) => this.patronymic = input}/>
                Phone number:
                <input type="text" ref={(input) => this.phoneNumber = input}/>
                Коментарий:
                <textarea placeholder={'Введите Ваш коментарий'} ref={(input) => this.info = input}/>
              </label>
              <input type="submit" value="Добавить"/>
            </form>
          </Modal>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    positions: startData.positions
  }
};

export default connect(mapStateToProps)(EmployeesFactoryPage)
