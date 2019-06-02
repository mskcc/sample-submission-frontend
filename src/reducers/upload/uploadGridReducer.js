import { uploadGridActions as ActionTypes } from '../../actions'
import { userActions as UserActionTypes } from '../../actions'
import { initialGridState } from './initialState'

export default function uploadGridReducer(state = initialGridState, action) {
  switch (action.type) {
    case ActionTypes.RESET_GRID_ERROR_MESSAGE:
      return {
        ...state,
        error: '',
      }
    case ActionTypes.REGISTER_GRID_CHANGE:
      return {
        ...state,
      }

    case ActionTypes.GET_COLUMNS:
      return {
        ...state,
        gridIsLoading: true,
      }
    case ActionTypes.NO_CHANGE:
      return {
        ...state,
        gridIsLoading: false,
        nothingToChange: true,
      }
    case ActionTypes.NO_CHANGE_RESET:
      return {
        ...state,

        nothingToChange: false,
      }
    case ActionTypes.UPDATE_NUM_OF_ROWS:
      return {
        ...state,
        gridIsLoading: true,
      }
    case ActionTypes.UPDATE_NUM_OF_ROWS_SUCCESS:
      return {
        ...state,
        gridIsLoading: false,
        rows: action.rows,
        form: action.form,
      }
    case ActionTypes.GET_COLUMNS_FROM_CACHE:
      return {
        ...state,
        gridIsLoading: false,
      }

    case ActionTypes.GET_COLUMNS_SUCCESS:
      return {
        ...state,
        gridIsLoading: false,
        columns: action.grid.columnHeaders,
        columnFeatures: action.grid.columnFeatures,
        rows: action.grid.rows,
        // rows: action.rows,
        form: action.form,
      }

    case ActionTypes.GET_COLUMNS_FAIL:
      return {
        ...state,
        gridIsLoading: false,
        error:
          action.error.response.data +
          ' ' +
          action.material +
          ' x ' +
          action.application,
      }

    case ActionTypes.UPDATE_CELLS:
      return {
        ...state,
        rows: action.rows,
      }

    case ActionTypes.EDIT_SUBMISSION_SUCCESS:
      console.log(state)
      return {
        ...state,
        rows: JSON.parse(action.payload.grid_values),
        form: JSON.parse(action.payload.form_values),

      }

    default:
      return state
  }
}
