const routes = {
  home: {name: 'California', href: '/'},
  employees: {name: 'Сотрудники', href: '/employees'},
  employeesList: {name: 'Список сотрудников', href: '/employees/list'},
  vacancies: {name: 'Открытые вакансии', href: '/employees/vacancies'},
  comments: {name: 'Передача смены', href: '/shifts'},
  commentsHistory: {name: 'История смен', href: '/shifts/history'},
  addNewComments: {name: 'Передать смену', href: '/shift/new'},
  updateComment: {name: 'Редактировать', href: '/shift/update/'},
  tasks: {
    name: 'Задачи',
    href: '/tasks',
    createNewTask: {name: 'Создать задачу', href: '/tasks/add'},
    myTasks: {name: 'Мои задачи', href: '/tasks/myTasks'},
    tasksHistory: {name: 'tasksHistory', href: '/tasks/history'}
  },
  washingData: {
    name: 'Данные о стирке',
    href: '/washingData',
    salesNumbers: {name: 'Продажные номера', href: '/washingData/salesNumbers'},
    lodgers: {name: 'Постояльцы', href: '/washingData/lodgers'}
  }
}

export default routes
