import React, {Component, Fragment} from 'react'

import '../styles/VacanciesList.css'
import axios from 'axios'
import Modal from "react-responsive-modal";
class EmployeeAdd extends Component {

    onOpenModal = () => {
        this.setState({open: true})
    }

    onCloseModal = () => {
        this.setState({open: false})
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`/employee`, {
            position: this.state.position,
            forename: this.state.forename,
            surname: this.state.surname,
            patronymic: this.state.patronymic,
            phoneNumber: this.state.phoneNumber,
            info: this.state.info})
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).then(() => this.setState({open: false}))
    }

    constructor (props) {
        super(props)
        this.state = {
            position: '',
            forename: '',
            surname: '',
            patronymic: '',
            phoneNumber: '',
            info: '',
            open: false
        }
        this.handlePositionChange = this.handlePositionChange.bind(this)
        this.handleForenameChange = this.handleForenameChange.bind(this)
        this.handleSurnameChange = this.handleSurnameChange.bind(this)
        this.handlePatronymicChange = this.handlePatronymicChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        this.handleInfoChange = this.handleInfoChange.bind(this)
    }

    handlePositionChange (event) {
        event.preventDefault()
        this.setState({position: event.target.value})
    }

    handleForenameChange (event) {
        event.preventDefault()
        this.setState({forename: event.target.value})
    }

    handleSurnameChange (event) {
        event.preventDefault()
        this.setState({surname: event.target.value})
    }

    handlePatronymicChange (event) {
        event.preventDefault()
        this.setState({patronymic: event.target.value})
    }

    handlePhoneNumberChange (event) {
        event.preventDefault()
        this.setState({phoneNumber: event.target.value})
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
                    <button onClick={this.onOpenModal}>Добавить сотрудника</button>
                    <Modal open={open} onClose={this.onCloseModal} center
                           closeOnOverlayClick={true}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Position:
                                <input type="text" name={"position"} value={this.state.position}
                                       onChange={this.handlePositionChange}/>
                                Forename:
                                <input type="text" name={"forename"} value={this.state.forename}
                                       onChange={this.handleForenameChange}/>
                                Surname:
                                <input type="text" name={"surname"} value={this.state.surname}
                                       onChange={this.handleSurnameChange}/>
                                Patronymic:
                                <input type="text" name={"patronymic"} value={this.state.patronymic}
                                       onChange={this.handlePatronymicChange}/>
                                Phone number:
                                <input type="text" name={"phoneNumber"} value={this.state.phoneNumber}
                                       onChange={this.handlePhoneNumberChange}/>

                                <br/>
                                <textarea placeholder={'Введите Ваш коментарий'} name={"info"} value={this.state.info}
                                          onChange={this.handleInfoChange}/>
                            </label><br/>
                            <input type="submit" value="Добавить" />
                        </form>
                    </Modal>
                </div>
            </Fragment>
        )
    }
}

export default EmployeeAdd
