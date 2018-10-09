import React, {Component, Fragment} from 'react'
import '../styles/VacanciesPage.css'
import {connect} from 'react-redux'
import {getAllVacancies} from '../actions/actions'
import Preloader from '../components/Preloader'
import {withStyles} from '@material-ui/core/styles'
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
import routes from "../constants/routes";
import {Link} from "react-router-dom";
import axios from "axios";

class VacanciesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: this.props.positions[0].id,
      salary: '',
      info: '',
      data: [],
      showClosedVacancies: false,
    }
  }

  componentWillMount() {
    const {GetAllVacancies} = this.props;
    let data = this.props.vacancies;
    GetAllVacancies();
    this.setState({vacancies: data})
  }

  deleteVacancy(id) {
    if (window.confirm('Вы уверены, что хотите удалить вакансию?')) {
      axios.delete(`/vacancy/${id}`)
        .then(() => this.props.GetAllVacancies())
    }
  }

  render() {
    const {data, showClosedVacancies} = this.state;
    const {vacancies, classes, positions} = this.props;
    const userId = this.props.currentUser.id;
    let toFilterVacancies = vacancies;

    if (!data) {
      return <Preloader/>
    }

    if (!showClosedVacancies) {
      toFilterVacancies = vacancies.filter(vacancy => vacancy.status === 'OPENED')
    } else {
      toFilterVacancies = vacancies.filter(vacancy => vacancy.status === 'CLOSED')
    }

    return (
      <Fragment>
        <Card className={classes.Controls} id="button" elevation={0}>
          <div className={classes.ControlsContainer}>
            <RadioGroup
              name="showClosedVacancies"
              aria-label={this.state.showClosedVacancies}
              value={toString(this.state.showClosedVacancies)}>
              <Paper onClick={() => this.setState({showClosedVacancies: !showClosedVacancies})}
                     className={classes.radioButton}
                     elevation={0}>
                <Radio className={classes.radioButtonInner}
                       checked={!this.state.showClosedVacancies}
                       onChange={() => this.setState({showClosedVacancies: !showClosedVacancies})}
                       value="d"
                       color="default"
                       name="radio-button-demo"
                       fontSize="small"
                       aria-label="Открытые вакансии">
                </Radio>
                <Typography variant={'caption'}>открытые вакансии</Typography>
              </Paper>
              <Paper onClick={() => this.setState({showClosedVacancies: !showClosedVacancies})}
                     className={classes.radioButton} elevation={0}>
                <Radio className={classes.radioButtonInner}
                       checked={this.state.showClosedVacancies}
                       onChange={() => this.setState({showClosedVacancies: !showClosedVacancies})}
                       value="d"
                       color="default"
                       name="radio-button-demo"
                       fontSize="small"
                       aria-label="Закрытые вакансии">
                </Radio>
                <Typography variant={'caption'}>закрытые вакансии</Typography>
              </Paper>
            </RadioGroup>
            <IconButton color="default" className={classes.button}
                        aria-label="Добавить Вакансию">
              <Link to={routes.updateVacancy.href}>
                <AddIcon fontSize="large"/>
              </Link>
            </IconButton>
          </div>
        </Card>
        <div className={classes.vacancyList}>
          <div className={classes.lineContainer}/>
          <List className={classes.vacancyListInner}>
            {toFilterVacancies.map(vacancy =>
              <Paper key={vacancy.id}
                     elevation={0}>
                <div className={classes.vacancyContainer}>
                  <div className={classes.vacancySideIcon}>
                    <svg className={classNames("MuiSvgIcon-root-86", classes.vacancySideIconSVG)} focusable="false"
                         viewBox="0 0 24 24" aria-hidden="true"
                         role="presentation">
                      <path
                        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    </svg>
                  </div>
                  <Paper className={classes.vacancyPaper} elevation={0}>
                    <div className={classes.vacancyInfo}>
                      <Typography className={classes.vacancyInfoTitle}
                                  variant={'subheading'}
                                  tag='title'
                                  children={positions.filter(position => position.id === vacancy.positionId)[0].title}/>
                      <Typography className={classes.vacancyInfoSubTitle}
                                  variant={'subheading'}
                                  children={new Date(vacancy.publication).toDateString()}/>
                      <Typography className={classes.vacancyInfoSalary} variant={'subheading'}
                                  children={`${vacancy.salary} грн.`}/>
                      <Typography children={vacancy.info} className={classes.vacancyInfoDescription} variant={'body2'}/>
                    </div>
                    <div className={classNames("ud_buttons", classes.ud_buttons)}>

                      {vacancy.authorId === userId &&
                      <button onClick={() => this.deleteVacancy(vacancy.id)} className={classes.buttons}>
                        <img alt="trash"
                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA2CAIAAAAd7s05AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wOS0yNVQxNjo0NDo0MSswMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDktMjVUMTY6NTA6MjkrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDktMjVUMTY6NTA6MjkrMDM6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWI5NTE2YjMtOGIzNC1iOTRhLWEzNzItYjUxMjA5ZGZmYzIxIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGRiMDViZjgtNDQ3Ni0yNjRmLThhOWYtYzJjOGJjNzY0Mjg3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OWNkOTRhOTMtOTdjMy1hNjRlLTg1MGUtM2M1ODk2OTdlN2E4Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5Y2Q5NGE5My05N2MzLWE2NGUtODUwZS0zYzU4OTY5N2U3YTgiIHN0RXZ0OndoZW49IjIwMTgtMDktMjVUMTY6NDQ6NDErMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmViOTUxNmIzLThiMzQtYjk0YS1hMzcyLWI1MTIwOWRmZmMyMSIgc3RFdnQ6d2hlbj0iMjAxOC0wOS0yNVQxNjo1MDoyOSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5m6N55AAABbElEQVRoge2YMUvDQBTHcz2HOqiZrJZSRBD3giUBA5mcHPwUjk5dpCJUbF06FEc/hYOTk+DiR7AWixTRplPUwTYQz8Gxtd5r/lJP3m888v7vlzveDSeUUpYJpKYtoAuLojFGdCZJ8Xu/f3BUb7baY75ZX1s9PizNptNJGllJdnQQRZVaY7ylZVnNVrtSawyiaOJGXwid66lUrg4vhi9v3aCn2WYps2gvzA2v16tlzQSto7+9u9eM+45u0NP/q5EYM0zGiGod/aa78dseP6I1TH8Bwj0ahq/xRwzpKlPStudJJYQd3d3bf3oO6FYjyC5nzk5PSCXGDBOLomFRNCyKhkXRsCgaFkXDomhYFA2LomFRNCyKhkXREESllKiuE0QRRPO5LDUdGEUQdYsFajowiiDqew7E1S0WfM+hVtHeR5VS5xeXV9c3D53HOKY9QUopV/I533N2treEEERPcx5y/+P1NF1YFA2LomFRNJ87a1rg2SgQagAAAABJRU5ErkJggg=="/>
                      </button>}

                      {vacancy.authorId === userId &&
                      <button className={classes.buttons}>
                        <Link to={{pathname: routes.updateVacancy.href + vacancy.id, state: vacancy}}>
                          <img alt="update"
                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA4CAIAAAAwxjyAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wOS0yNVQxNjo0NDo0MSswMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDktMjVUMTY6NTE6NTMrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDktMjVUMTY6NTE6NTMrMDM6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJmZTVlMDYtYjBhOC03ZjQ2LWJjNzEtZjE1MGQwMmY3ZjFiIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZTc4MjY2MTYtOGJkYy04ZTRhLWJjMzQtNjVlMWY3M2U5NjA0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGI2YjE1M2UtNzI5Zi02MDRiLTk0MWMtZjA2NjRhMWRmZTY5Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0YjZiMTUzZS03MjlmLTYwNGItOTQxYy1mMDY2NGExZGZlNjkiIHN0RXZ0OndoZW49IjIwMTgtMDktMjVUMTY6NDQ6NDErMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQyZmU1ZTA2LWIwYTgtN2Y0Ni1iYzcxLWYxNTBkMDJmN2YxYiIgc3RFdnQ6d2hlbj0iMjAxOC0wOS0yNVQxNjo1MTo1MyswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I9bW0AAAEB0lEQVRoge3Z2W8TRwAH4NkFiUMqAZJAmrTwBkpIC62QgJLDiXM4EB4qoT6Qgxx2YjsOVVMlsHbAa6M27NrcEqdA6kPVJ/6BSggR2iJAlWirQjic2PGVtR1nvV4biVKnD+tCcNabHWfX8ODf0+7MeObTzM7KHiOzs7Pg/Qv6rgH8ybFgsjQ7w8TjL3746caD3/8AAGz/7NOOlv0rV64QaI9k4ZEPz9CYmfD6qdclxR+uH8GH8teuSfcR2RcxPENjODnXBADw+SkMJ6fD9LthzdARDCe9vqn5VT4/heFEOpm8LOLURV4TF5+fMuIEHWHmV8nL0ve0r85bJdDA66cuXftxfrksLCbKJhIJAMCGj4q/x4fyBGUP//w7GyyaZoaOjtjOXkkkZpMy86CArLAgX3YWTTMYTni8/ju/3befu8zJNn5ckk62ZAna2faVvCw6wmAW0u31c7ejv94/ef7KG9mxwbxVH6SYBgyaz7dukZFFRxgMJ90e39zC27/cO3n+alK2oeQ78xsZiqLf9KmrK3bw9ibNWz7CRDGcnHR7eWurK3Z+269BUQQA4Jz0GHGSjcUHDN2Kyl3pOpSAJWzioqjcOWBIyiZcbrfHV7Wbf56kYUWYqBEnXYImLjVVuwYMagRBxHS7qGeLYaImi02MCQBwa/TumQvXRfacOYthokaLzTnpETsSim4tLxXbOENTlDVa4Uxf67tqq7+QkcVEWaOFdLpgTLpOpWhTJqwoGzNZbFCmQ9oOpWI31ChwLM404XKLbI8gSL+2o66mAmoUOBZnGndOijcd0nbUw5sgWCwbM1nhTbWVGZjEslg2ZrLaxycgTP29mZtEsdhY3GS1OyZc4k2G3oMNysxNC7PYWHzYaoMy9fW0NyqrFmNagMXG4sPH7c/HYUyadlVd9SJNQqxY/MXwcftzh1O8Sa9pU9VLYBJi/XxzFMqkU7c21SskMQEB1pf7GptVSpG96Lpb9zTUSEQCgJc1HZ7hLrTdLXtVtQt2oVe37WmU0sTDogKhweGRQHCau9V1t+5tFJLp1K2Sm3hYT545AsEQhhPB0P8yddoF0i6Eloz1+KkDAEAFQkfMRDAU5gr1mramBkWqqaulWcQSS8Mae+LgLqgAN2dJWZ+mXTVno/V2HWhuErshFst6+fKfuV9apqgghhOh6eQOMPQkX5U9nQf2NdXJZwIpv3wejT0bOjqS0qJo/boTlsMF+cmTu4d/Pdr2SZmsJpAyW2NPHfNbTFGBI2bi9VsjCyZRLADAFBUgTl969erfLIC4vHXSnMIqLFhbXra5vGxzeemmkuKirJlSWSXFRSuWL9tSuonTrCvkOXnKTrJxAJ5B3tN/MXIsmORYMMmxYJJjwSTHgsl/zeq39IbYQpYAAAAASUVORK5CYII="/>
                        </Link>
                      </button>}
                    </div>
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
    positions: state.startData.positions,
    currentUser: state.startData.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllVacancies: () => dispatch(getAllVacancies())
  }
};

export default withStyles(vacancyStyles)(connect(mapStateToProps, mapDispatchToProps)(VacanciesPage))