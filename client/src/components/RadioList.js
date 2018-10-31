// import React, {Component} from 'react'
// import routes from "../constants/routes";
//
// class RadioList extends Component {
//
//   render() {
//
//     const {links, data} = this.props
//     const {add} = data
//     const {calendar} = data
//
//
//     return (
//       <div className="radioANDbuttons">
//         <ul className="position-radio-buttons" onChange={this.setPositionView.bind(this)}>
//           {selectPositionInputs}
//         </ul>
//         <div className="add_and_history">
//           <Link to={routes.addNewComments.href}>
//             <img alt="add comment" src={picture}/>
//           </Link>
//           <Link to={routes.commentsHistory.href}>
//             <img alt="calendar is here" src={calendar}/>
//           </Link>
//         </div>
//       </div>
//     )
//   }
// }