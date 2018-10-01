import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../constants/routes'
import Home from '../pages/Home'
import Employees from '../pages/Employees'
import EmployeeList from '../pages/EmployeeList'
import Vacancies from '../pages/VacanciesPage'
import Comments from '../pages/shifts/Shifts'
import ShiftsHistory from '../pages/shifts/ShiftsHistory'
import CreateNewComments from '../pages/shifts/CreateNewShift'
import Tasks from '../pages/tasks/Tasks'
import CreateNewTask from '../pages/tasks/CreateNewTask'
import TasksHistory from '../pages/tasks/TasksHistory'
import TasksView from '../pages/tasks/TasksView'
import WashingData from '../pages/WashingData'
import SalesNumbers from '../pages/washingDate/SalesNumbers'
import Lodgers from '../pages/washingDate/Lodgers'
import Header from './Header'
import CreateNewVacancy from "../pages/CreateNewVacancy";

class Navigation extends Component {
  render() {
    const {header} = this.props
    return (
      <Switch>
        <Route exact path={routes.home.href}
               render={(props) => header ? <Header previousRoute={routes.home} {...props}/> : <Home {...props}/>}/>
        <Route exact path={routes.employees.href}
               render={(props) => header ? <Header previousRoute={routes.employees} {...props}/> : <Employees {...props}/>}/>
        <Route exact path={routes.employeesList.href}
               render={(props) => header ? <Header previousRoute={routes.employeesList} {...props}/> : <EmployeeList {...props}/>}/>
        <Route exact path={routes.vacancies.href}
               render={(props) => header ? <Header previousRoute={routes.vacancies} {...props}/> : <Vacancies {...props}/>}/>
        <Route exact path={routes.comments.href}
               render={(props) => header ? <Header previousRoute={routes.comments} {...props}/> : <Comments {...props}/>}/>
        <Route exact path={routes.commentsHistory.href}
               render={(props) => header ? <Header previousRoute={routes.commentsHistory} {...props}/> : <ShiftsHistory {...props}/>}/>
        <Route exact path={routes.addNewComments.href}
               render={(props) => header ? <Header previousRoute={routes.addNewComments} {...props}/> : <CreateNewComments {...props}/>}/>
        <Route path={routes.updateComment.href + ':commentId'}
               render={(props) => header ? <Header previousRoute={routes.updateComment} {...props}/> : <CreateNewComments {...props}/>}/>
        <Route path={routes.updateVacancy.href + ':vacancyId'}
               render={(props) => header ? <Header previousRoute={routes.updateVacancy} {...props}/> : <CreateNewVacancy {...props}/>}/>
        <Route exact path={routes.tasks.href}
               render={(props) => header ? <Header previousRoute={routes.tasks} {...props}/> : <Tasks {...props}/>}/>
        <Route exact path={routes.createNewTask.href}
               render={(props) => header ? <Header previousRoute={routes.createNewTask} {...props}/> : <CreateNewTask {...props}/>}/>
        <Route exact path={routes.tasksView.href}
               render={(props) => header ? <Header previousRoute={routes.tasksView} {...props}/> : <TasksView {...props}/>}/>
        <Route exact path={routes.tasksHistory.href}
               render={(props) => header ? <Header previousRoute={routes.tasksHistory} {...props}/> : <TasksHistory {...props}/>}/>
        <Route exact path={routes.washingData.href}
               render={(props) => header ? <Header previousRoute={routes.washingData} {...props}/> : <WashingData {...props}/>}/>
        <Route exact path={routes.salesNumbers.href}
               render={(props) => header ? <Header previousRoute={routes.salesNumbers} {...props}/> : <SalesNumbers {...props}/>}/>
        <Route exact path={routes.lodgers.href}
               render={(props) => header ? <Header previousRoute={routes.lodgers} {...props}/> : <Lodgers {...props}/>}/>
      </Switch>
    )
  }
}

export default Navigation;