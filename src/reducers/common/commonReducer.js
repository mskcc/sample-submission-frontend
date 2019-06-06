import {
  commonActions,
  userActions,
  uploadFormActions,
  uploadGridActions as ActionTypes,
} from '../../actions'

const initialState = {
  version: '2.0',
  error: false,
  message: '',
  serverError: false,
  // loading: true,
}

// global errors and messages
function commonReducer(state = initialState, action) {
  const { type, error, message, serverError } = action

  if (serverError) {
    return {
      ...state,
      error: true,
      serverError: true,
      message:
        'Our backend is experiencing some downtime. Please refresh, check back later or message an admin.',
    }
  } else if (error) {
    if (error.response.status == 401) {
      return {
        ...state,
        error: true,
        message: 'Your session expired. Please log back in.',
      }
    } else {
      return {
        ...state,
        error: true,
        message: action.error.response
          ? action.error.response.data.message
          : action.error.message,
      }
    }
  } else if (message) {
    return {
      ...state,
      message: action.message,
    }
  } else {
    switch (action.type) {
      case ActionTypes.SERVER_ERROR:

      // case ActionTypes.SET_ERROR_MESSAGE:
      //   return {
      //     ...state,
      //     error: true,
      //     message: action.payload.response.data.message,
      //   }
      case ActionTypes.RESET_ERROR_MESSAGE:
        return {
          ...state,
          error: false,
          message: '',
        }

      case ActionTypes.RESET_MESSAGE:
        return {
          ...state,
          error: false,
          message: '',
        }

      // case ActionTypes.SET_MESSAGE:
      //   return {
      //     ...state,

      //     message: payload.message,
      //   }

      case ActionTypes.REQUEST_CHECK_VERSION:
        return {
          ...state,
        }

      case ActionTypes.RECEIVE_CHECK_VERSION_SUCCESS:
        return {
          ...state,
          versionValid: true,
          error: false,
        }

      case ActionTypes.RECEIVE_CHECK_VERSION_FAIL:
        return {
          ...state,
          error: action.error,
          message: action.message,

          versionValid: false,
        }

      default:
        return state
    }
  }
}

export default commonReducer
