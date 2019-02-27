import axios from 'axios'

let API_ROOT = 'http://localhost:9004'

export const REQUEST_CHECK_VERSION = 'REQUEST_CHECK_VERSION'

export const RECEIVE_CHECK_VERSION_SUCCESS = 'RECEIVE_CHECK_VERSION_SUCCESS'

export const RECEIVE_CHECK_VERSION_FAIL = 'RECEIVE_CHECK_VERSION_FAIL'

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
        dispatch({
          type: RECEIVE_CHECK_VERSION_FAIL,
          error: error.response.data.message,
        })
      })
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})


