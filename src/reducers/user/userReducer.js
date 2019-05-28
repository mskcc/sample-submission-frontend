import { userActions as ActionTypes } from '../../actions'

const initialState = {
  submissions: { test: 'test' },
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
      return { ...state, loading: false }
    case ActionTypes.GET_SUBMISSIONS_SUCCESS:
      return { ...state, submissionsTable: action.payload.table, submissions: action.payload.submissions, loading: false }

    default:
      return state
  }
}

export default userReducer
