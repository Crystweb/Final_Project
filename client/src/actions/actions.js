import * as types from '../constants/actionTypes'

export function addShift (shift) {
  return {
    type: types.ADD_SHIFT,
    shift
  }
}
