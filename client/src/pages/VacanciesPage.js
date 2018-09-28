import React, { Component, Fragment } from 'react'
import Modal from 'react-responsive-modal'
import axios from 'axios'
import '../styles/VacanciesPage.css'
import { connect } from 'react-redux'
import { getAllVacancies } from '../actions/actions'
import Preloader from '../components/Preloader'

import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import Typography from '@material-ui/core/Typography/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import Paper from '../../node_modules/@material-ui/core/Paper/Paper'
import Card from '../../node_modules/@material-ui/core/Card/Card'
import IconButton from '../../node_modules/@material-ui/core/IconButton/IconButton'
import AddIcon from '@material-ui/icons/AddCircleRounded'
import classNames from 'classnames'
import List from '../../node_modules/@material-ui/core/List/List'
import vacancyStyles from '../constants/vacancyStylesJSS'

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
        <Card className={classes.Controls} id="button" elevation={0}>
          <div className={classes.ControlsContainer}>
            <RadioGroup
              name="showClosed"
              aria-label={this.state.showClosed}
              value={toString(this.state.showClosed)}>
              <Paper onClick={() => this.setState({showClosed: !showClosed})} className={classes.radioButton} elevation={0}>
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
              <Paper onClick={() => this.setState({showClosed: !showClosed})} className={classes.radioButton} elevation={0}>
                <Radio  className={classes.radioButtonInner}
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
              <AddIcon fontSize="large"/>
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
                  <option name={'position'} key={position.id} value={position.id}>
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
          <div className={classes.lineContainer}/>
          <List>
          {toFilterVacancies.map(vacancy =>
            <Paper key={vacancy.id}
                   elevation={0}>
              <div className={classes.vacancyContainer}>
                <div className={classes.vacancySideIcon}>
                <svg className={classNames("MuiSvgIcon-root-86",classes.vacancySideIconSVG)} focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                     role="presentation">
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
              </div>
                <Paper className={classes.vacancyInfo} elevation={0}>
                  <Typography className={classes.vacancyInfoTitle}
                              variant={'subheading'}
                              tag='title'
                              children = {positions.filter(item => item.id === vacancy.positionId)[0].title} />
                  <Typography className={classes.vacancyInfoSubTitle}
                              variant={'subheading'}
                              children = {new Date(vacancy.publication).toDateString()}/>
                  <Typography className={classes.vacancyInfoSalary} variant={'subheading'} children={`${vacancy.salary} грн.`} />
                  <Typography children={vacancy.info} className={classes.vacancyInfoDescription} variant={'body2'} />
                </Paper>
              </div>
            </Paper>
          )}
          </List>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
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

export default withStyles(vacancyStyles)(connect(mapStateToProps, mapDispatchToProps)(VacanciesPage))
