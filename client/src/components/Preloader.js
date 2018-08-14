import React from 'react'
import '../styles/Preloader.css'

const preloader = () => {
  return (
    <div className="load">
      <div className="load__container">
        <div className="load__item"></div>
        <div className="load__item"></div>
        <div className="load__item"></div>
      </div>
    </div>

  )
}

export default preloader
