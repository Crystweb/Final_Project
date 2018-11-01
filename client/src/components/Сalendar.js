import React, { Component, Fragment } from 'react'
import 'react-infinite-calendar/styles.css'
import '../styles/Calendar.css'
import { connect } from 'react-redux'
import { addSelectedDateFromCalendar } from '../actions/actions'
import date_fns from 'date-fns/locale/ru'
import InfiniteCalendar from 'react-infinite-calendar'
import ShiftHistoryForSelectedDay from '../pages/shifts/ShiftsHistoryForSelectedDay'
import TasksView from '../pages/tasks/TasksView'
import CheckInHistoty from '../pages/roomCheckin/CheckInHistory'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDataSelected: false
    }
  }

  render () {
    const {max, min, selected, minDate, maxDate, addDate, isForComments, isForTasks, isForCheckIn} = this.props
    if (this.state.isDataSelected) {
      return (
        <Fragment>
          {isForComments && <ShiftHistoryForSelectedDay/>}
          {isForTasks && <TasksView itIsHistory={true} showAll={true}/>}
          {isForCheckIn && <CheckInHistoty/>}
        </Fragment>
      )
    }
    return (
      <div>
        <InfiniteCalendar
          className="day"
          rowHeight={60}
          max={max}
          min={min}
          width={300}
          height={300}
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
            this.setState({
              isDataSelected: true
            })
            addDate(date.getTime())
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

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDate: (date) => dispatch(addSelectedDateFromCalendar(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
