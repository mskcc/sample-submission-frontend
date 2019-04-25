import axios from 'axios'

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = 'sample-receiving-backend/'
}

export const REQUEST_CHECK_VERSION = 'REQUEST_CHECK_VERSION'

export const SERVER_ERROR = 'SERVER_ERROR'

export const RECEIVE_CHECK_VERSION_SUCCESS = 'RECEIVE_CHECK_VERSION_SUCCESS'

export const RECEIVE_CHECK_VERSION_FAIL = 'RECEIVE_CHECK_VERSION_FAIL'
export const RECEIVE_SERVER_ERROR = 'RECEIVE_SERVER_ERROR'



export function checkVersion(version) {
  return dispatch => {
    dispatch({ type: REQUEST_CHECK_VERSION })
    return axios
      .get(API_ROOT + '/checkVersion?', {
        params: {
          version: version,
        },
      })
      .then(response => {
        dispatch({
          type: RECEIVE_CHECK_VERSION_SUCCESS,
          data: response.data,
        })
        return response
      })

      .catch(error => {
        if (error.response) {
          dispatch({
            type: RECEIVE_CHECK_VERSION_FAIL,
            error: error,
            errorMessage: error.response.data.message,
          })
        } else {
          dispatch({
            type: SERVER_ERROR,
            error: error,
          })
        }
      })
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})
