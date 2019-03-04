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
    case ActionTypes.NO_CHANGE:
      return {
        ...state,
        gridIsLoading: false,
      }
    case ActionTypes.RECEIVE_COLUMNS_CHANGE_ROWS:
      return {
        // ...state,
        // gridIsLoading: false,
        // form: {
        //   ...state.form,
        //   number_of_samples: action.payload.number_of_samples,
        // },
        ...state,
        gridIsLoading: false,
        rows: action.rows,
        form: action.form,
      }
    case ActionTypes.RECEIVE_COLUMNS_FROM_CACHE:
      return {
        ...state,
        gridIsLoading: false,
      }

    case ActionTypes.RECEIVE_COLUMNS_SUCCESS:
      return {
        ...state,
        gridIsLoading: false,
        columns: action.columns,
        rows: action.rows,
        form: action.form,
      }

    case ActionTypes.RECEIVE_COLUMNS_FAIL:
      return {
        ...state,
        gridIsLoading: false,
        error:
          action.error + ' ' + action.material + ' x ' + action.application,
      }

    default:
      return state
  }
}
