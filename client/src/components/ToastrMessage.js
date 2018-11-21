import React, { Component } from 'react'
import ReduxToastr from 'react-redux-toastr'

class ToastrMessage extends Component {
  render () {
    return (
      <div>
        <ReduxToastr
          timeOut={2000}
          newestOnTop={true}
          preventDuplicates
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          position='bottom-center'
        />
      </div>
    )
  }
}

export default ToastrMessage