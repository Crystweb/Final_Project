import { ADD_NEW_TASK, DELETE_CLOSED_TASK, GET_TASKS } from '../constants/actionTypes'
import { toastr } from 'react-redux-toastr'

const initialState = {
  allTasks: null
}

export default function tasksReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {...state, allTasks: action.tasks}
    case ADD_NEW_TASK:
      return {...state, allTasks: [...state.allTasks, action.newTask]}
    case DELETE_CLOSED_TASK:
      return {...state, allTasks: [...state.allTasks.filter(task => task.id !== action.task.id)]}
    case NEW_TASK_FROM_SERVER:
      const newTask = JSON.parse(action.task)
      const isClosedTask = state.allTasks.some(task => task.id === +newTask.id)
      const isTaskForCurrentUser = newTask.assignee.id === user.employee.id
      isClosedTask ? this.props.deleteClosedTask(newTask) : this.props.addTask(newTask)
      isClosedTask && user.employee.position.pinnedToComment
        ? toastr.info(`Задача '${newTask.message}' в ${newTask.locations[0].title} закрыта`)
        : isTaskForCurrentUser && toastr.info(`Добавлена новая задача`)
    default:
      return state
  }
}
