import { uploadGridActions as ActionTypes } from '../../actions'
import { initialGridState } from './initialState'

export default function uploadGridReducer(state = initialGridState, action) {
  switch (action.type) {
    case ActionTypes.RESET_GRID_ERROR_MESSAGE:
      return {
        ...state,
        error: '',
      }

    case ActionTypes.REQUEST_COLUMNS:
      return {
        ...state,
        gridIsLoading: true,
      }

    case ActionTypes.RECEIVE_COLUMNS_FAIL:
      return {
        ...state,
        error:
          action.error + ' ' + action.material + ' x ' + action.application,
      }

    default:
      return state
  }
}
