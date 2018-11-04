import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../styles/RoomCheckIn.css'
import routes from '../../constants/routes'
import Link from 'react-router-dom/es/Link'
import Select from 'react-select'

class RoomsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      floor: this.props.checkInLocations[0].id,
      floorName: this.props.checkInLocations[0].title
    }
    this.chooseFloor = this.chooseFloor.bind(this)
  }

  chooseFloor (event) {
    this.setState({
      floor: event.value,
      floorName: event.label
    })
  }

  render () {
    const {checkInLocations} = this.props
    const {floor, floorName} = this.state
    const chosenFloor = floor && checkInLocations.find(location => location.id === +floor).children

    let options = []

    checkInLocations && checkInLocations.map(location => {
      options.push({value: location.id, label: location.title})
    })

    const styles = {
      dropdownIndicator: (base, state) => ({
      }),

      placeholder: (base, state) => ({
      }),
      valueContainer: (base, state) => ({
      }),
      control: (base, state) => ({
      }),
      indicatorsContainer: (base, state) => ({

      }),
      input: (base, start) => ({
        display: "none"
      })
    }


    return (


      <div className='floors'>

        <Select
          styles={styles}
          className='floors__select'
          classNamePrefix="react-select"
          options={options}
          onChange={this.chooseFloor}
          defaultValue={2}
          value={floor}
          placeholder={floorName}
          controlShouldRenderValue={true}
        />


        {floor &&
          <ul className='floors__rooms'>
            {chosenFloor.map(room => {
              return (
                <li
                  className='roomName'
                  key={room.id}
                  value={room.id}
                >
                  <Link
                    className='roomName__item'
                    to={routes.taskForRoom.href + room.id}
                  >
                    {room.title}
                  </Link>
                </li>
              )
            })
            }
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    checkInLocations: startData.locations.filter((location) => location.children.length > 0)
  }
}

export default connect(mapStateToProps)(RoomsList)
