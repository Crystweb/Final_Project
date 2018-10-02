import green from '@material-ui/core/colors/green'

const vacancyStyles = ({
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
    cursor:'pointer',
  },
  radioButtonInner:{
    transform: 'scale(0.8)',
  },
  button: {
    margin: 5,
    transform: 'scale(0.9)',
  },
  input: {
    display: 'none',
  },
  vacancyList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 54,
  },
  vacancyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  vacancyInfoDescription: {
    padding: 3,
    fontSize: 14,
    fontWeight: 200,
    color: "#292a2c"
  },
  vacancyInfoTitle: {
    padding: 3,
    fontWeight: 'bold',
    fontSize: 14,
    color: "#727375",
    textTransform: 'capitalize'
  },
  vacancyInfoSubTitle: {
    padding: 3,
    fontWeight: 'normal',
    fontSize: 11,
    color: "#a5a6a8"
  },
  vacancyInfoSalary: {
    padding: 3,
    fontWeight: 'normal',
    fontSize: 11,
    color: "#9b9c9e"
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
  },
  vacancySideIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    display: 'block',
    zIndex: 200,
  },
  vacancySideIconSVG: {
    position: 'relative',
    top: -63,
    left: -16.5,
    fill: "#7b7c7e",
    transform: 'scale(0.7)',
    zIndex: 201,
  },
  lineContainer:{
    width: "7%",
    borderRight: '1px solid #7b7c7e',
    display: 'block',
    height: '100vh',
  }
})

export default vacancyStyles
