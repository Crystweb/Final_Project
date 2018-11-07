import React, { Component } from 'react'
import 'react-infinite-calendar/styles.css'
import '../styles/Calendar.css'
import date_fns from 'date-fns/locale/ru'
import InfiniteCalendar from 'react-infinite-calendar'

class Calendar extends Component {

  render () {
    const {max, min, selected, minDate, maxDate, getData} = this.props

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
            getData(date.getTime())
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

export default Calendar
