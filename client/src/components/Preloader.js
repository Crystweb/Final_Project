import React from 'react'
import '../styles/preloader.css'

const Preloader = (props) => {
  const {fullscreen} = props

  return (
    <div className="container">
      <div className="load__item"></div>
      <div className="load__item"></div>
      <div className="load__item"></div>
      <div className="load__item"></div>
      <div className="load__item"></div>
    </div>

  )
}

export default Preloader
