import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import {getAllVacancies} from "../../actions/actions";
import Select from 'react-select'

class VacanciesFactoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toUpdate: false,
      successAction: '',
      id: null,
      position: null,
      salary: null,
      status: null,
      publication: null

    };


  }

  handleSubmit = (event) => {
    const toUpdate = this.state.toUpdate;
    event.preventDefault();
    axios({
      url: '/vacancy',
      method: toUpdate ? 'PUT' : 'POST',
      data: toUpdate ? {
            id: this.state.id,
            position: this.props.positions.find(position => position.id === this.state.position),
            info: this.info.value,
            salary: this.salary.value,
            status: this.status.value,
            publication: this.state.publication
          }
      : {
      position: this.props.positions.find(position => position.id === this.state.position),
      info: this.info.value,
      salary: this.salary.value
      },
    })
      .then((response) => this.setState({
        successAction: toUpdate ? 'Вакансия изменена успешно' : 'Создана новая вакансия'}))
  };

  componentWillMount() {
    const item = this.props.location.state;

    if (item) {
      this.setState({
        id: item.id,
        position: item.positionId,
        status: item.status,
        salary: item.salary,
        info: item.info,
        publication: item.publication,
        toUpdate: true
      })
    }
  }



  render() {
    const {positions} = this.props;
    const {positionId, status, salary, info, toUpdate} = this.state;

    const styles = {
      dropdownIndicator: (base, state) => ({
      }),

      placeholder: (base, state) => ({
      }),
      valueContainer: (base, state) => ({
      }),
      control: (base, state) => ({
      }),
      indicatorsContainer: (base, state) => ({

      }),
      input: (base, start) => ({
        display: "none"
      })
    }

    let options = []

    positions.map(position =>
      options.push({value: position.id, label: position.title})
    )

    let placeholder = options[0].label

    let positionSelect =
      <Select
        className="vacancy__select"
        classNamePrefix="react-select"
      styles={styles}
        options={options}
        onChange={value => this.setState({position: value.value})}
        defaultValue={positionId}
        placeholder={"" + placeholder}
      />

    if (!positions) {
      return <Preloader/>
    } else return (
      <div className="container vacancy__wrap">
        <form onSubmit={this.handleSubmit}>
            <div className="vacancy__wrap-select">
            {positionSelect}
            </div>
            {toUpdate &&
            <p> Status: </p>}
            {toUpdate && <select ref={(input) => this.status = input} defaultValue={status}>
              <option key='1' value='OPENED'> OPENED</option>
              <option key='2' value='CLOSED'> CLOSED</option>
            </select>}
            <div className="vacancy__wrap-select">
            <input className="vacancy__salary"
                   type="text"
                   ref={(input) => this.salary = input}
                   defaultValue={salary}
                   placeholder="Зарплата"/>
            </div>
            <div className="vacancy__wrap-textarea">
            <textarea
              className="vacancy__textarea"
              rows="5"
              placeholder={'Привет друг, что бы ты хотел мне написать?'}
              ref={(input) => this.info = input}
              defaultValue={info}/>
            </div>
          <div className="vacancy__btns">
          <button className="vacancy__create"
            type="submit" onClick={() => setTimeout(() => this.props.history.push('/employees/vacancies'), 1000)}
                  value={this.props.location.state ? "Изменить вакансию" : "Добавить вакансию"}>
            {this.props.location.state ? "Изменить вакансию" : "Добавить вакансию"}
            </button>
          </div>
        </form>
        <p>{this.state.successAction}</p>
      </div>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    positions: startData.positions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateVacancy: () => dispatch(updateVacancy()),
    // addNewVacancy: () => dispatch(addNewVacancy()),
    getAllVacancies: () => dispatch(getAllVacancies()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VacanciesFactoryPage)