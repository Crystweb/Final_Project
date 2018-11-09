import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../constants/routes'
import Home from '../pages/Home'
import Profile from '../pages/profile/Profile'
import ProfileEdit from '../pages/profile/ProfileEdit'
import Employees from '../pages/Employees'
import EmployeesPage from '../pages/employees/EmployeesPage'
import EmployeesFactoryPage from '../pages/employees/EmployeesFactoryPage'
import Vacancies from '../pages/vacancies/VacanciesPage'
import VacanciesFactoryPage from '../pages/vacancies/VacanciesFactoryPage'
import Comments from '../pages/shifts/Shifts'
import ShiftsHistory from '../pages/shifts/ShiftsHistory'
import CreateNewComments from '../pages/shifts/CommentsFactory'
import Tasks from '../pages/tasks/Tasks'
import CreateNewTask from '../pages/tasks/TaskFactory'
import TasksHistory from '../pages/tasks/TasksHistory'
import TasksView from '../pages/tasks/TasksView'
import WashingData from '../pages/WashingData'
import SalesNumbers from '../pages/washingDate/SalesNumbers'
import Lodgers from '../pages/washingDate/Lodgers'
import Header from './Header'
import RoomCheckIn from '../pages/roomCheckin/RoomsList'
import TasksForRoom from '../pages/roomCheckin/TasksForRoom'
import CheckInHistory from '../pages/roomCheckin/CheckInHistory'

class Navigation extends Component {
  render () {
    const {header} = this.props
    return (
      <Switch>
        <Route exact path={routes.home.href}
          render={(props) => header ? <Header previousRoute={routes.home} {...props}/> : <Home {...props}/>}/>
        <Route exact path={routes.profile.href}
          render={(props) => header ? <Header previousRoute={routes.profile} {...props}/> : <Profile {...props}/>}/>
        <Route exact path={routes.profileEdit.href}
          render={(props) => header ? <Header previousRoute={routes.profileEdit} {...props}/> : <ProfileEdit {...props}/>}/>
        <Route exact path={routes.profileEdit.href}
          render={(props) => header ? <Header previousRoute={routes.employees} {...props}/>
            : <Employees {...props}/>}/>
        <Route exact path={routes.employeesList.href}
          render={(props) => header ? <Header previousRoute={routes.employeesList} {...props}/>
            : <EmployeesPage {...props}/>}/>
        <Route exact path={routes.updateEmployee.href + ':employeeId'}
          render={(props) => header ? <Header previousRoute={routes.updateEmployee} {...props}/>
            : <EmployeesFactoryPage {...props}/>}/>
        <Route exact path={routes.addNewEmployee.href}
          render={(props) => header ? <Header previousRoute={routes.addNewEmployee} {...props}/>
            : <EmployeesFactoryPage {...props}/>}/>
        <Route exact path={routes.vacancies.href}
          render={(props) => header ? <Header previousRoute={routes.vacancies} {...props}/>
            : <Vacancies {...props}/>}/>
        <Route exact path={routes.comments.href}
          render={(props) => header ? <Header previousRoute={routes.comments} {...props}/>
            : <Comments {...props}/>}/>
        <Route exact path={routes.commentsHistory.href}
          render={(props) => header ? <Header previousRoute={routes.commentsHistory} {...props}/>
            : <ShiftsHistory {...props}/>}/>
        <Route exact path={routes.addNewComments.href}
          render={(props) => header ? <Header previousRoute={routes.addNewComments} {...props}/>
            : <CreateNewComments {...props}/>}/>
        <Route path={routes.updateComment.href + ':commentId'}
          render={(props) => header ? <Header previousRoute={routes.updateComment} {...props}/>
            : <CreateNewComments {...props}/>}/>
        <Route path={routes.updateVacancy.href + ':vacancyId'}
          render={(props) => header ? <Header previousRoute={routes.updateVacancy} {...props}/>
            : <VacanciesFactoryPage {...props}/>}/>
        <Route path={routes.addNewVacancy.href}
          render={(props) => header ? <Header previousRoute={routes.addNewVacancy} {...props}/>
            : <VacanciesFactoryPage {...props}/>}/>
        <Route exact path={routes.tasks.href}
          render={(props) => header ? <Header previousRoute={routes.tasks} {...props}/> : <Tasks {...props}/>}/>
        <Route exact path={routes.createNewTask.href}
          render={(props) => header ? <Header previousRoute={routes.createNewTask} {...props}/>
            : <CreateNewTask {...props}/>}/>
        <Route exact path={routes.tasksView.href}
          render={(props) => header ? <Header previousRoute={routes.tasksView} {...props}/>
            : <TasksView {...props}/>}/>
        <Route exact path={routes.tasksHistory.href}
          render={(props) => header ? <Header previousRoute={routes.tasksHistory} {...props}/>
            : <TasksHistory {...props}/>}/>
        <Route exact path={routes.washingData.href}
          render={(props) => header ? <Header previousRoute={routes.washingData} {...props}/>
            : <WashingData {...props}/>}/>
        <Route exact path={routes.salesNumbers.href}
          render={(props) => header ? <Header previousRoute={routes.salesNumbers} {...props}/>
            : <SalesNumbers {...props}/>}/>
        <Route exact path={routes.lodgers.href}
          render={(props) => header ? <Header previousRoute={routes.lodgers} {...props}/>
            : <Lodgers {...props}/>}/>
        <Route exact path={routes.roomCheckIn.href}
          render={(props) => header ? <Header previousRoute={routes.roomCheckIn} {...props}/>
            : <RoomCheckIn {...props}/>}/>
        <Route exact path={routes.taskForRoom.href + ':roomId'}
          render={(props) => header ? <Header previousRoute={routes.taskForRoom} {...props}/>
            : <TasksForRoom {...props}/>}/>
        <Route exact path={routes.createNewTask.href + ':floorId/:roomId'}
          render={(props) => header ? <Header previousRoute={routes.createTaskForRoom} {...props}/>
            : <CreateNewTask {...props}/>}/>
        <Route exact path={routes.checkInHistory.href}
          render={(props) => header ? <Header previousRoute={routes.checkInHistory} {...props}/>
            : <CheckInHistory/>}/>
      </Switch>
    )
  }
}

export default Navigation
