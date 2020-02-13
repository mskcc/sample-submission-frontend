import { promoteActions as ActionTypes } from '../../actions'
import { initialPromoteState } from './initialState'

export default function uploadFormReducer(state = initialPromoteState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_INITIAL_STATE_PROMOTE:
      return {
        ...state,
        formIsLoading: true,
      }

    case ActionTypes.RECEIVE_INITIAL_STATE_PROMOTE_SUCCESS:
      return {
        ...state,
        columns: action.grid.columnHeaders,
        hiddenColumns: action.grid.hiddenColumns,
        columnFeatures: action.grid.columnFeatures,
        rows: action.grid.rows,
        initialFetched: true,
        // patientIdFormats: action.data.patientIdFormats,
      }
    case ActionTypes.RECEIVE_INITIAL_STATE_PROMOTE_FAIL:
      return { ...state, initialFetched: false }
    case ActionTypes.RECEIVE_BANKED_SAMPLES_SUCCESS:
      return { ...state, rows: action.rows }
    default:
      return state
  }
}
