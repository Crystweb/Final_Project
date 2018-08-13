import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

const Calendar = (props) => {
  const {max, min, selected, minDate, maxDate} = props

  return (
    <InfiniteCalendar
      max={max}
      min={min}
      width={320}
      height={600}
      selected={selected}
      minDate={minDate}
      maxDate={maxDate}
      displayOptions={{
        showHeader: false
      }}
    />
  )
}

export default Calendar
