import React, {Component, Fragment} from 'react'
import '../../styles/VacanciesPage.css'
import {connect} from 'react-redux'
import {getAllVacancies} from '../../actions/actions'
import Preloader from '../../components/Preloader'
import {withStyles} from '@material-ui/core/styles'
import noPhoto from '../../img/no-photo.png'
import employeeStyles from '../../constants/employeeStylesJSS'
import routes from "../../constants/routes";
import {Link} from "react-router-dom";
import axios from "axios";
import picture from "../../img/add.png";
import Lightbox from 'react-images'

class EmployeesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      showOnlyCRM_users: false,
      lightbox: null
    }
  }

  componentWillMount() {
    axios.get('/employee')
      .then(response => {
        this.setState({employees: response.data})
      })
  }



  deleteEmployee(id) {
    if (window.confirm('Вы уверены, что хотите удалить вакансию?')) {
      axios.delete(`/employee/${id}`)
        // .then(() => this.props.getAllVacancies())
    }
  }

  render() {
    const {employees} = this.state;

    if (!this.state.employees) {
      return <Preloader/>
    } else {
      return (
        <Fragment>
          <div className="add_and_history add_and_history--employee">
            <Link to={routes.addNewEmployee.href}>
              <img alt="add comment" src={picture}/>
            </Link>
          </div>
          <ul className="employeeList">

            {employees.map(employee => {
              return <li className="employeeList__elem" key={employee.id}>
                  <div className="employee-fotoWrap">
                    {employee.image ? <div
                                      onClick={() => this.setState({lightbox: employee.image})}>
                      <img src={employee.image} alt=""/>
                      <Lightbox
                        isOpen={this.state.lightbox === employee.image}
                        images={[{ src: employee.image }]}
                        onClickImage={() => this.setState({lightbox: null})}
                        onClose={() => this.setState({lightbox: null})}
                      />
                    </div> : <div><img src={noPhoto} alt="#"/></div>}
                  </div>
                  <div className="employee-wrapInfo">
                <h3 className="employee-data">
                  {employee.forename + " " + employee.surname}
                </h3>
                <h4 className="employee-tel">
                  <a href={"tel:" + employee.phoneNumber}>{employee.phoneNumber}</a>
                </h4>
                <p className="employee-info">
                  {employee.info}
                </p>
                  </div>
                </li>
            })}
          </ul>
        </Fragment>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllVacancies: () => dispatch(getAllVacancies())
  }
};

const mapStateToProps = (state) => {
  return {
    vacancies: state.vacancies,
    positions: state.startData.positions,
    currentUser: state.startData.currentUser
  }
};


export default withStyles(employeeStyles)(connect(mapStateToProps, mapDispatchToProps)(EmployeesPage))