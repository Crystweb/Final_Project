const routes = {
  home: {name: 'California', href: '/'},
  comments: {name: 'Передача смены', href: '/comments'},
  commentsHistory: {name: 'История смен', href: '/comments/history'},
  addNewComments: {name: 'Передать смену', href: '/comments/new'},
  tasks: {
    name: 'Задачи',
    href: '/tasks',
    hotelTasks: {name: 'Отель', href: '/tasks/hotel'},
    kitchenTasks: {name: 'Кухня', href: '/tasks/kitchen'},
    firstRestaurantTasks: {name: 'Первый Ресторан', href: '/tasks/firstRestaurant'},
    secondRestaurantTasks: {name: 'Второй Ресторан', href: '/tasks/secondRestaurant'},
    cyclicTasks: {name: 'Циклические задачи', href: '/tasks/cyclic'}
  }
}

export default routes
