import React, {Component} from 'react'

class Point extends Component {

  render() {
    let {color} = this.props

    if (!color || color === "#c7c8ca") {
      color = "rgb(96, 100, 108)"
    }

    return (
      <div className="comment-list__elem-point">
        <div className="comment-list__elem-line"></div>
        <div className="point-big" style={{backgroundColor: color}}>
          <div className="point-small"></div>
        </div>
      </div>
    )
  }
}

export default Point