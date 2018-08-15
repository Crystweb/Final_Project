import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import '../styles/Calendar.css'
import { connect } from 'react-redux'
import { addSelectedDateFromCalendar } from '../actions/actions'
import date_fns from 'date-fns/locale/ru'

const Calendar = (props) => {
  const {max, min, selected, minDate, maxDate} = props

  return (
    <InfiniteCalendar
      className="day"
      rowHeight={60}
      max={max}
      min={min}
      width={400}
      height={600}
      selected={selected}
      minDate={minDate}
      maxDate={maxDate}
      displayOptions={{
        showHeader: false
      }}
      onSelect={date => this.props.addDate(date)}
      locale={{
        locale: date_fns,
        weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekStartsOn: 1,
        todayLabel: {
          long: 'сейчас'
        }
      }}

    />
  )
}

const mapStateToProps = () => {}

const mapDispatchToProps = (dispatch) => {
  return {
    addDate: (date) => {
      dispatch(addSelectedDateFromCalendar(date))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
