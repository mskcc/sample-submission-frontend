import { commonActions as ActionTypes } from '../../actions'

const initialState = {
  version: '2.0',
  versionValid: false,
  error: null,
}

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SERVER_ERROR:
      return {
        ...state,
        error: action.error,
        errorMessage: 'Our backend is experiencing some downtime. Please check back later or message an admin.',
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
        errorMessage: action.errorMessage,
        formIsLoading: false,
        versionValid: false,
      }

    default:
      return state
  }
}

export default commonReducer
