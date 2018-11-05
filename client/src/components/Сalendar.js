import React, { Component, Fragment } from 'react'
import 'react-infinite-calendar/styles.css'
import '../styles/Calendar.css'
import { connect } from 'react-redux'
import { addSelectedDateFromCalendar } from '../actions/actions'
import date_fns from 'date-fns/locale/ru'
import InfiniteCalendar from 'react-infinite-calendar'
import ShiftHistoryForSelectedDay from '../pages/shifts/ShiftsHistoryForSelectedDay'
import TasksView from '../pages/tasks/TasksView'

class Calendar extends Component {

  render () {
    const {max, min, selected, minDate, addDate, maxDate, isForComments, isForTasks, isForCheckIn, getChekIn} = this.props
    if (this.props.date) {
      return (
        <Fragment>
          {isForComments && <ShiftHistoryForSelectedDay/>}
          {isForTasks && <TasksView itIsHistory={true} showAll={true}/>}
        </Fragment>
      )
    }
    return (
      <div className="calendar-wrap">
        <InfiniteCalendar
          className="day"
          rowHeight={60}
          max={max}
          min={min}
          width={320}
          height={320}
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          displayOptions={{
            showHeader: false
          }}
          theme={{
            selectionColor: 'rgb(127, 244, 169)',
            textColor: {
              default: '#333',
              active: '#4b5461'
            },
            weekdayColor: 'rgb(127, 244, 169)',
            floatingNav: {
              background: 'rgb(127, 244, 169)',
              color: '#FFF',
              chevron: '#FFA726'
            }
          }}
          onSelect={date => {
            addDate(date.getTime())
            isForCheckIn ? getChekIn(date.getTime()) : false
          }}
          locale={{
            locale: date_fns,
            weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekStartsOn: 1,
            todayLabel: {
              long: 'сейчас'
            }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = ({selectedDate}) => {
  return {
    date: selectedDate.historySelectedDate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDate: (date) => dispatch(addSelectedDateFromCalendar(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
