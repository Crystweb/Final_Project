const routes = {
  home: {name: 'грилив отель', href: '/', previousHref: null},
  employees: {name: 'персонал', href: '/employees', previousHref: '/'},
  employeesList: {name: 'сотрудники', href: '/employees/list', previousHref: '/employees'},
  addNewEmployee: {name: 'Создать сотрудника', href: '/employees/list/new', previousHref: '/employees/list'},
  updateEmployee: {name: 'изменить сотрудника', href: '/employees/list/update/', previousHref: '/employees/list'},
  vacancies: {name: 'вакансии', href: '/employees/vacancies', previousHref: '/employees'},
  comments: {name: 'смены', href: '/shifts', previousHref: '/'},
  commentsHistory: {name: 'История смен', href: '/shifts/history', previousHref: '/shifts'},
  addNewComments: {name: 'Передать смену', href: '/shift/new', previousHref: '/shifts'},
  updateComment: {name: 'изменить комментарий ', href: '/shift/update/', previousHref: '/shifts'},
  tasks: {name: 'Задачи', href: '/tasks', previousHref: '/'},
  createNewTask: {name: 'назначить задачу', href: '/tasks/add', previousHref: '/tasks'},
  tasksView: {name: 'Мои задачи', href: '/tasks/myTasks', previousHref: '/tasks'},
  tasksHistory: {name: 'история задач', href: '/tasks/history', previousHref: '/tasks'},
  washingData: {name: 'стирка', href: '/washingData', previousHref: '/'},
  salesNumbers: {name: 'Продажные номера', href: '/washingData/salesNumbers', previousHref: '/washingData'},
  lodgers: {name: 'Постояльцы', href: '/washingData/lodgers', previousHref: '/washingData'}
}

export default routes
