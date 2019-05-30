import { userActions as ActionTypes } from '../../actions'

const initialState = {
  submissions: {},
  error: null,
  loading: false,
  loggedIn: false,
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SERVER_ERROR:
      return {
        ...state,
        error: action.error,
        message:
          'Our backend is experiencing some downtime. Please check back later or message an admin.',
      }

    case ActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
      }

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
        message: 'Welcome back, ' + action.payload.username + '.',
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
        message: action.payload.message,
      }

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        // loading: false,
        message: action.message,
      }

    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        username: '',
        message: 'Successfully logged out.',
      }

    case ActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loggedIn: true,
        // loading: false,
        message: action.message,
      }
    case ActionTypes.GET_SUBMISSIONS:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_SUBMISSIONS_FAIL:
      return { ...state, loading: false, error: error }
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

    case ActionTypes.BUTTON_RESET: {
      return { ...state, submitted: false, saved: false }
    }

    default:
      return state
  }
}

export default userReducer
