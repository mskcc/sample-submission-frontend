import {
  uploadFormActions as UploadActionTypes,
  userActions as ActionTypes,
} from '../../actions'

const initialState = {
  submissions: {},
  loading: false,
  loggedIn: false,
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.REFRESH_TOKEN_VALID:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        username: action.payload.username,
        // message: 'Welcome back, ' + action.payload.username + '.',
      }

    case ActionTypes.REFRESH_TOKEN_INVALID:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        username: '',
      }

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        username: action.payload.username,
        submissionsTable: action.table,
        submissions: action.payload.submissions,
        // message: action.payload.message,
      }

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        loading: false,
      }

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        username: '',
        // message: 'Successfully logged out.',
      }

    case ActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loggedIn: true,
        // loading: false,
        // message: action.message,
      }

    case UploadActionTypes.RECEIVE_INITIAL_STATE_SUCCESS:
      return {
        ...state,
        submissionsTable: action.user_data.table,
        submissions: action.user_data.submissions,
      }

    case ActionTypes.GET_SUBMISSIONS:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_SUBMISSIONS_FAIL:
      return { ...state, loading: false, error: action.error }
    case ActionTypes.GET_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        submissionsTable: action.payload.table,
        submissions: action.payload.submissions,
        loading: false,
      }
    case ActionTypes.SAVE_PARTIAL_SUBMISSION:
      return {
        ...state,
        isSaving: true,
      }
    case ActionTypes.SAVE_PARTIAL_SUBMISSION_FAIL:
      return { ...state, isSaving: false }
    case ActionTypes.SAVE_PARTIAL_SUBMISSION_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saved: true,

        submissionsTable: action.payload.table,
        submissions: action.payload.submissions,
      }

    case ActionTypes.EDIT_SUBMISSION:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.EDIT_SUBMISSION_FAIL:
      return { ...state, loading: false }

    case ActionTypes.EDIT_SUBMISSION_SUCCESS:
      console.log(state)
      return {
        ...state,
        loading: false,
      }

    case ActionTypes.DELETE_SUBMISSION:
      return {
        ...state,
        isSaving: true,
      }
    case ActionTypes.DELETE_SUBMISSION_FAIL:
      return { ...state, isSaving: false }
    case ActionTypes.DELETE_SUBMISSION_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saved: true,

        submissionsTable: action.payload.table,
        submissions: action.payload.submissions,
      }

    case ActionTypes.BUTTON_RESET: {
      return { ...state, submitted: false, saved: false }
    }

    default:
      return state
  }
}

export default userReducer
