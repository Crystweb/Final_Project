import React, {Component} from 'react'

class Point extends Component {

  render() {
    const {color} = this.props

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