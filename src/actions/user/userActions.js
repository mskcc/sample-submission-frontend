import axios from 'axios'
import { generateSubmissionsGrid } from '../helpers'

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = 'https://delphi.mskcc.org/sample-receiving-backend/'
}

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('access_token')
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  error => {
    return Promise.reject(error)
  }
)
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export const REFRESH_TOKEN_VALID = 'REFRESH_TOKEN_VALID'
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST'
export const REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID'

export function refreshToken() {
  return dispatch => {
    let token = localStorage.getItem('refresh_token')
    if (token) {
      dispatch({ type: REFRESH_TOKEN_REQUEST })

      return axios
        .get(
          API_ROOT + '/refresh',
          { headers: { Authorization: `Bearer ${token}` } },
          {}
        )
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          return dispatch({
            type: REFRESH_TOKEN_VALID,
            payload: response.data,
          })
        })

        .catch(error => {
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('access_token')

          if (error.response) {
            dispatch({
              type: REFRESH_TOKEN_INVALID,
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
      // storage.getToken()
      //   ? dispatch({ type: REFRESH_TOKEN_VALID })
      //   : dispatch({ type: SESSION_INVALID })
    } else
      dispatch({
        type: REFRESH_TOKEN_INVALID,
        errorMessage: 'Your session expired. Please log in again.',
      })
  }
}

export const SERVER_ERROR = 'SERVER_ERROR'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function login(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST })
    return axios
      .post(API_ROOT + '/login', {
        data: {
          username: username,
          password: password,
        },
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)

        return dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        })
      })

      .catch(error => {
        return dispatch({
          type: LOGIN_FAIL,
          message: error.response.data.message,
        })
      })
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST })

    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')

    if (access_token) {
      axios
        .get(API_ROOT + '/logoutAccess', {})
        .then(response => {
          localStorage.removeItem('access_token')
        })
        .catch(error => {
          return dispatch({
            type: LOGOUT_FAIL,
            message: error.response.data.message,
          })
        })
    }
    let token = localStorage.getItem('refresh_token')
    if (refresh_token) {
      localStorage.removeItem('refresh_token')
      axios
        .get(
          API_ROOT + '/logoutRefresh',
          { headers: { Authorization: `Bearer ${token}` } },
          {}
        )
        .then(response => {
          return dispatch({
            type: LOGOUT_SUCCESS,
          })
        })
        .catch(error => {
          return dispatch({
            type: LOGOUT_FAIL,
            message: error.response.data.message,
          })
        })
    } else
      return dispatch({
        type: LOGOUT_SUCCESS,
      })
  }
}

export const GET_SUBMISSIONS = 'GET_SUBMISSIONS'
export const GET_SUBMISSIONS_FAIL = 'GET_SUBMISSIONS_FAIL'
export const GET_SUBMISSIONS_SUCCESS = 'GET_SUBMISSIONS_SUCCESS'
export function getSubmissions() {
  return dispatch => {
    dispatch({ type: GET_SUBMISSIONS })
    return axios
      .get(API_ROOT + '/getSubmissions', {})
      .then(response => {
        console.log(response.data)
        dispatch({
          type: GET_SUBMISSIONS_SUCCESS,
          payload: {
            submissions: response.data,
            table: generateSubmissionsGrid(response.data),
          },
        })
      })
      .catch(error => {
        dispatch({
          type: GET_SUBMISSIONS_FAIL,
          error: error,
        })
        return error
      })
  }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})
