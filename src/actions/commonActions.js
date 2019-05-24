import axios from 'axios'

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = 'https://delphi.mskcc.org/sample-receiving-backend/'
}

import { get, post, patch, url } from '../utils/request'

import { storage } from '../utils'

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
        return dispatch({
          type: RECEIVE_CHECK_VERSION_SUCCESS,
          data: response.data,
        })
      })

      .catch(error => {
        if (error.response) {
          dispatch({
            type: RECEIVE_CHECK_VERSION_FAIL,
            error: error,
            message: error.response.data.message,
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

//   /**
//    * @param {string} email The username or email to authenticate
//    * @param {string} password
//    */
//   static login({ email, password }) {
//     return post(authV1('/login'), { email, password })
//   }

//   static logout() {
//     return get(authV1('/logout'))
//   } //   /**
//    * @param {string} token The user's auth token
//    */
//   static checkAuthToken(token) {
//     return get(authV1('/check-auth-token'), { token })
//   }

// const PREFIX = '/auth'

// function authUrl(uri, queryParams) {
//   return url(`${PREFIX}${uri}`, queryParams)
// }

// function authV1(uri, queryParams) {
//   return v1(`${PREFIX}${uri}`, queryParams)
// }

// export default class Auth {
//   /**
//    * @param {string} password
//    * @param {string} newPassword
//    * @param {string} confirmNewPassword
//    */
//   static changePassword({ password, newPassword, confirmNewPassword }) {
//     return post(authV1('/change-password'), { password, newPassword, confirmNewPassword })
//   }

//   /**
//    * @param {string} token The user's auth token
//    */
//   static checkAuthToken(token) {
//     return get(authV1('/check-auth-token'), { token })
//   }

//   /**
//    * @param {string} email
//    */
//   static forgotPassword({ email }) {
//     return post(authUrl('/reset'), { email })
//   }

//   /**
//    * @param {string} email The username or email to authenticate
//    * @param {string} password
//    */
//   static login({ email, password }) {
//     return post(authV1('/login'), { email, password })
//   }

//   static logout() {
//     return get(authV1('/logout'))
//   }

//   /**
//    * @param {string} email
//    */
//   static resendConfirmationEmail(email) {
//     return post(authV1('/resend-confirmation-email'), { email })
//   }

//   /**
//    * @param {string} token The reset token from the URL
//    * @param {string} newPassword
//    * @param {string} confirmNewPassword
//    */
//   static resetPassword(token, { newPassword, confirmNewPassword }) {
//     return post(authUrl(`/reset/${token}`), { newPassword, confirmNewPassword })
//   }

//   /**
//    * @param {Object} payload The user details
//    * @param {string} payload.firstName
//    * @param {string} payload.lastName
//    * @param {string} payload.username
//    * @param {string} payload.email
//    * @param {string} payload.password
//    */
//   static signUp(payload) {
//     return post(authV1('/users'), payload)
//   }

//   /**
//    * @param {object} user The user whose profile is being updated
//    * @param {object} payload Any modified fields to be updated
//    */
//   static updateProfile(user, payload) {
//     return patch(authV1(`/users/${user.id}`), payload)
//   }
// }

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})
