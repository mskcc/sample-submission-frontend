import { commonActions as ActionTypes } from '../../actions'

const initialState = {
  version: '2.0',
  versionValid: false,
  sessionValid: false,
  error: null,
  message: '',
}

function commonReducer(state = initialState, action) {
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

    case ActionTypes.REQUEST_CHECK_VERSION:
      return {
        ...state,
        formIsLoading: true,
      }

    case ActionTypes.RECEIVE_CHECK_VERSION_SUCCESS:
      return {
        ...state,
        formIsLoading: false,
        versionValid: true,
        error: null,
      }

    case ActionTypes.RECEIVE_CHECK_VERSION_FAIL:
      return {
        ...state,
        error: action.error,
        message: action.message,
        formIsLoading: false,
        versionValid: false,
      }

    case ActionTypes.SESSION_INVALID:
      return {
        ...state,
        sessionValid: false,
      }

    case ActionTypes.SESSION_VALID:
      return {
        ...state,
        sessionValid: true,
        message: action.message,
      }

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        sessionValid: true,
        message: action.message,
      }

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        message: action.message,
      }

    default:
      return state
  }
}

export default commonReducer
