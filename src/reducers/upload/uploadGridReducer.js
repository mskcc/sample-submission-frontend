import { uploadGridActions as ActionTypes } from '../../actions'
import { initialGridState } from './initialState'

export default function uploadGridReducer(state = initialGridState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_INITIAL_COLUMNS:
      return {
        ...state,
        gridIsLoading: true,
      }

    default:
      return state
  }
}

