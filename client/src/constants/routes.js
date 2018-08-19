const routes = {
  home: {name: 'California', href: '/'},
  employees: {name: 'Сотрудники', href: '/employees'},
  employeesList: {name: 'Список сотрудников', href: '/employees/list'},
  vacancies: {name: 'Открытые вакансии', href: '/employees/vacancies'},
  comments: {name: 'Передача смены', href: '/shifts'},
  commentsHistory: {name: 'История смен', href: '/shifts/history'},
  shiftsHistoryForSelectedDay: {name: 'Выберете тим смены', href: '/shifts/history/selected'},
  shiftHistoryAdmin: {name: 'Смена администратора', href: '/shifts/history/selected/admin'},
  shiftHistoryManager: {name: 'Смена менеджера', href: '/shifts/history/selected/manager'},
  addNewComments: {name: 'Передать смену', href: '/shift/new'},
  tasks: {
    name: 'Задачи',
    href: '/tasks',
    hotelTasks: {name: 'Отель', href: '/tasks/hotel'},
    kitchenTasks: {name: 'Кухня', href: '/tasks/kitchen'},
    firstRestaurantTasks: {name: 'Первый Ресторан', href: '/tasks/firstRestaurant'},
    secondRestaurantTasks: {name: 'Второй Ресторан', href: '/tasks/secondRestaurant'},
    cyclicTasks: {name: 'Циклические задачи', href: '/tasks/cyclic'},
    myTasks: {name: 'Мои задачи', href: '/tasks/myTasks'}
  },
  washingData: {
    name: 'Данные о стирке',
    href: '/washingData',
    salesNumbers: {name: 'Продажные номера', href: '/washingData/salesNumbers'},
    lodgers: {name: 'Постояльцы', href: '/washingData/lodgers'}
  }
}

export default routes
