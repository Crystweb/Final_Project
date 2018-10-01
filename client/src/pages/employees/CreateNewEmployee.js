import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import * as _ from 'lodash'

class CreateNewEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedPositions: (this.props.updateEmployee && this.props.updateEmployee.positions) || [],
            textComment: (this.props.updateEmployee && this.props.updateEmployee.text) || undefined,
            errorText: null,
            errorCheckedPosition: null,
            successPost: null,
            employeeForUpdate: this.props.updateEmployee || null
        }
    }

    addEmployee() {
        const {
            position,
            forename,
            surname,
            patronymic,
            phoneNumber,
            info
        } = this.state

        if (_.isEmpty(position)) {
            this.setState({
                successPost: null,
                errorText: null,
                errorCheckedPosition: 'Выберите позицию'
            })
        } else {
            if (_.isEmpty(forename)) {
                this.setState({
                    successPost: null,
                    errorCheckedPosition: null,
                    errorText: 'Введите имя'
                })
            } else {
                if (_.isEmpty(surname)) {
                    this.setState({
                        successPost: null,
                        errorCheckedPosition: null,
                        errorText: 'Введите фамилию'
                    })
                } else {
                    if (_.isEmpty(patronymic)) {
                        this.setState({
                            successPost: null,
                            errorCheckedPosition: null,
                            errorText: 'Введите отчество'
                        })
                    } else {
                        if (_.isEmpty(phoneNumber)) {
                            this.setState({
                                successPost: null,
                                errorCheckedPosition: null,
                                errorText: 'Введите номер телефона'
                            })
                        } else {
                            if (_.isEmpty(info)) {
                                this.setState({
                                    successPost: null,
                                    errorCheckedPosition: null,
                                    errorText: 'Введите дополнительную информацию'
                                })
                            } else {
                                axios.post('/employees/list',
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
                                            successPost: 'Сотрудник добавлен'
                                        })
                                    })
                                    .then(() => {
                                        setTimeout(() => this.props.history.push('/employees/list'), 1500)
                                    })
                            }
                        }
                    }
                }
            }
        }
    }


    updateEmployee() {
        const {
            position,
            forename,
            surname,
            patronymic,
            phoneNumber,
            info
        } = this.state

        if (_.isEmpty(position)) {
            this.setState({
                successPost: null,
                errorText: null,
                errorCheckedPosition: 'Выберите позицию'
            })
        } else {
            if (_.isEmpty(forename)) {
                this.setState({
                    successPost: null,
                    errorCheckedPosition: null,
                    errorText: 'Введите имя'
                })
            } else {
                if (_.isEmpty(surname)) {
                    this.setState({
                        successPost: null,
                        errorCheckedPosition: null,
                        errorText: 'Введите фамилию'
                    })
                } else {
                    if (_.isEmpty(patronymic)) {
                        this.setState({
                            successPost: null,
                            errorCheckedPosition: null,
                            errorText: 'Введите отчество'
                        })
                    } else {
                        if (_.isEmpty(phoneNumber)) {
                            this.setState({
                                successPost: null,
                                errorCheckedPosition: null,
                                errorText: 'Введите номер телефона'
                            })
                        } else {
                            if (_.isEmpty(info)) {
                                this.setState({
                                    successPost: null,
                                    errorCheckedPosition: null,
                                    errorText: 'Введите дополнительную информацию'
                                })
                            } else {
                                axios.post('/employees/list',
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
                                            successPost: 'Сотрудник добавлен'
                                        })
                                    })
                                    .then(() => {
                                        setTimeout(() => this.props.history.push('/employees/list'), 1500)
                                    })
                            }
                        }
                    }
                }
            }
        }
    }

addText(event)
{
    this.setState({forename: event.target.value})
    this.setState({surname: event.target.value})
    this.setState({patronymic: event.target.value})
    this.setState({phoneNumber: event.target.value})
    this.setState({info: event.target.value})
}

setPosition(event)
{
    let currentPosition = event.target.value
    let Positions = this.state.checkedPositions
    if (Positions.includes(currentPosition)) {
        let positionIndex = Positions.indexOf(currentPosition)
        let firstPartPositionsArray = Positions.slice(0, positionIndex)
        let secondPartPositionsArray = Positions.slice(positionIndex + 1)
        Positions = firstPartPositionsArray.concat(secondPartPositionsArray)
    } else {
        Positions.push(event.target.value)
    }
    this.setState({Positions: Positions})
}

render()
{
    let isUpdate = !!this.state.employeeForUpdate
    if (!this.props.allPositionsForEmployee) {
        return (
            <Preloader/>
        )
    } else if (!this.state.employeeForUpdate) {
        return (<div className="container">
                <h3>Создать сотрудника</h3><br/>
                {this.props.allPositionsForEmployee.map(position => {
                        const isForEmployee = position.pinnedToEmployee === true
                        return (
                            <div>
                                {isForEmployee && <li key={position.id}>
                                    <input
                                        name="position"
                                        type="checkbox"
                                        checked={true && this.state.checkedPositions.includes(position.title)}
                                        value={position.title}
                                        onChange={this.setPosition.bind(this)}
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
                       value=" Добавить сотрудника "
                       onClick={this.addEmployee.bind(this)}/>
                <p>{this.state.errorCheckedPosition || this.state.errorText}</p>
                <p>{this.state.successPost}</p>
            </div>
        )
    } else {
        return (<div className="container">
                {isUpdate || <h3>Добавить сотрудника</h3>}
                {isUpdate && <h3>Изменить сотрудника</h3>}
                {this.props.allPositionsForEmployee.map(position =>
                    <li key={position.id}>
                        <input
                            name="position"
                            type="checkbox"
                            checked={true && this.state.checkedPositions.includes(position.title)}
                            value={position.title}
                            onChange={this.setPosition.bind(this)}
                        />
                        {position.title}
                    </li>
                )}
                <p><textarea value={this.state.textComment}
                             ref={this.textInput}
                             placeholder={'Введите Ваш коментарий'}
                             onChange={this.addText.bind(this)}/></p>
                {isUpdate || <input type="button"
                                    value=" Добавить сотрудника "
                                    onClick={this.addEmployee.bind(this)}/>}
                {isUpdate && <input type="button"
                                    value="Изменить сотрудника"
                                    onClick={this.updateEmployee.bind(this)}/>
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
            allPositionsForEmployee: startData.positions,
            updateEmployee: comments.lastComments.find(comment => comment.id === +ownProps.match.params.commentId)
        }
    } else {
        return {
            allPositionsForEmployee: startData.positions
        }
    }
}

export default connect(mapStateToProps)(CreateNewEmployee)
