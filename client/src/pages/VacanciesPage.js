import React, { Component, Fragment } from 'react'
import Modal from 'react-responsive-modal'
import axios from 'axios'
import '../styles/VacanciesPage.css'
import { connect } from 'react-redux'
import { getAllVacancies } from '../actions/actions'
import Preloader from '../components/Preloader'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import Radio from '@material-ui/core/Radio'
import Typography from '@material-ui/core/Typography/Typography'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioGroup from '@material-ui/core/RadioGroup'
import Paper from '../../node_modules/@material-ui/core/Paper/Paper'
import Card from '../../node_modules/@material-ui/core/Card/Card'
import IconButton from '../../node_modules/@material-ui/core/IconButton/IconButton'
import AddIcon from '@material-ui/icons/AddCircleRounded'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  ControlsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: '13%',
    width: '100%'
  },
  Controls: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioButton: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 26,
    marginTop: 6,
  },
  radioButtonInner:{
    transform: 'scale(0.8)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  vacancyList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 44,
  },
  vacancyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '6.8%',
    borderLeft: '1px solid grey'
  },
  vacancyInfoItem: {
    padding: 3,
    fontSize: 12,
    color: "#292a2c"
  },
  vacancyInfoTitle: {
    padding: 3,
    fontWeight: 700,
    fontSize: 13,
    color: "#727375",
    textTransform: 'capitalize'
  },
  vacancyInfoSubTitle: {
    padding: 3,
    fontWeight: 400,
    fontSize: 10,
    color: "#a5a6a8"
  },
  vacancyInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-start',
    marginLeft: 26,
    position: 'relative',
    top:-32,
    paddingBottom: 16,
    // borderLeft: '3px solid grey',
  },
  vacancySideIcon: {
    position: 'absolute',
    // bottom: 0,
    // left: 25.5,
    // marginRight: 50,
    width: 32,
    height: 32,
    // width: '100%',
    // height: '1rem',
    display: 'block',
  },
  vacancySideIconSVG: {
    position: 'relative',
    top: -60,
    left: -16.5,
    fill: "#c7c8ca",
    transform: 'scale(0.7)'
  }

})

class VacanciesPage extends Component {

  onOpenModal = () => {
    this.setState({open: true})
  }

  onCloseModal = () => {
    this.setState({open: false})
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: '/vacancy',
      method: 'POST',
      data: {
        positionId: this.state.position,
        info: this.state.info,
        salary: this.state.salary
      }
    })
      .then((response) => this.setState({open: false, resData: response.data}))
      .then(() => this.props.GetAllVacancies())
  }

  constructor (props) {
    super(props)
    this.state = {
      position: this.props.positions[0].id,
      salary: '',
      info: '',
      open: false,
      // positions: this.props.positions,
      data: [],
      newVac: {},
      showClosed: false,
      vacancies: {}
    }

    this.handlePositionChange = this.handlePositionChange.bind(this)
    this.handleSalaryChange = this.handleSalaryChange.bind(this)
    this.handleInfoChange = this.handleInfoChange.bind(this)
  }

  componentWillMount () {
    const {GetAllVacancies} = this.props
    let data = this.props.vacancies

    GetAllVacancies()
    this.setState({vacancies: data})
  }

  componentDidMount () {
    const {GetAllVacancies} = this.props
    let data = this.props.vacancies

    GetAllVacancies()
    this.setState({vacancies: data})
  }

  handlePositionChange (event) {
    event.preventDefault()
    this.setState({position: event.target.value})
  }

  handleSalaryChange (event) {
    event.preventDefault()
    this.setState({salary: event.target.value})
  }

  handleInfoChange (event) {
    event.preventDefault()
    this.setState({info: event.target.value})
  }

  render () {
    const {data, showClosed} = this.state
    const {vacancies, classes, positions} = this.props
    let toFilterVacancies = vacancies
    const {open,} = this.state

    if (!data) {
      return <Preloader/>
    }

    if (!showClosed) {
      toFilterVacancies = vacancies.filter(vacancy => vacancy.status === 'OPENED')
    } else {toFilterVacancies = vacancies.filter(vacancy => vacancy.status === 'CLOSED')}

    return (
      <Fragment>

        <Typography align={'center'} style={{alignSelf: 'flex-start'}} variant={'title'}>вакансии</Typography>
        <Card className={classes.Controls} id="button" elevation={'0'}>

          <div className={classes.ControlsContainer}>
            <RadioGroup
              name="showClosed"
              aria-label={this.state.showClosed}
              value={this.state.showClosed}>
              <Paper className={classes.radioButton} elevation={'0'}>
                <Radio className={classes.radioButtonInner}
                  checked={!this.state.showClosed}
                  onChange={() => this.setState({showClosed: !showClosed})}
                  value="d"
                  color="default"
                  name="radio-button-demo"
                  fontSize="small"
                  aria-label="Открытые вакансии">
                </Radio>
                <Typography variant={'caption'}>открытые вакансии</Typography>
              </Paper>
              <Paper className={classes.radioButton} elevation={'0'}>
                <Radio className={classes.radioButtonInner}
                  checked={this.state.showClosed}
                  onChange={() => this.setState({showClosed: !showClosed})}
                  value="d"
                  color="default"
                  name="radio-button-demo"
                  fontSize="small"
                  aria-label="Закрытые вакансии">
                </Radio>
                <Typography variant={'caption'}>закрытые вакансии</Typography>
              </Paper>
            </RadioGroup>
            <IconButton onClick={this.onOpenModal} color="default" className={classes.button}
                        aria-label="Добавить Вакансию">
              <AddIcon fontSize="default"/>
            </IconButton>
          </div>
        </Card>
        <Modal open={open}
               onClose={this.onCloseModal}
               center
               closeOnOverlayClick={true}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Название должности:
              <select onChange={this.handlePositionChange}>
                {positions.map(position =>
                  <option type="text" name={'position'} key={position.id} value={position.id}>
                    {position.title}
                  </option>)}
              </select>
              Зарплата:
              <input type="text" name={'salary'} value={this.state.salary}
                     onChange={this.handleSalaryChange}/>
              <br/>
              <textarea placeholder={'Введите Ваш коментарий'} name={'info'} value={this.state.info}
                        onChange={this.handleInfoChange}/>
            </label>
            <input type="submit" value="Добавить"/>
          </form>
        </Modal>
        <div className={classes.vacancyList}>
          {toFilterVacancies.map(vacancy =>
            <Paper key={vacancy.id}
                   elevation={'0'}
                   className={classNames(
                     {'btn-${buttonType}': this.state.info}
                   )}>
              {console.log('vacancy :', vacancy)}
              {console.log('positions :', positions)}
              <div className={classes.vacancyContainer}>
                <div className={classes.vacancySideIcon}>
                <svg className={classNames("MuiSvgIcon-root-86",classes.vacancySideIconSVG)} focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                     role="presentation">
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                </svg>
              </div>
                <Paper className={classes.vacancyInfo} elevation={'0'}>
                  <Typography className={classes.vacancyInfoTitle}
                              variant={'h2'}
                              tag='title'
                              children = {positions[vacancy.positionId].title} />
                  <Typography className={classes.vacancyInfoSubTitle}
                              variant={'subheading'}
                              children = {new Date(vacancy.publication).toDateString()}
                              />

                  <Typography className={classes.vacancyInfoItem} variant={'subheading'} children={`${vacancy.salary} + грн.`} />
                  <Typography children={vacancy.info} className={classes.vacancyInfoItem} variant={'p'} />

                </Paper>
              </div>
            </Paper>
          )}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, startData) => {
  return {
    vacancies: state.vacancies,
    positions: state.startData.positions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllVacancies: () => dispatch(getAllVacancies())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(VacanciesPage))
