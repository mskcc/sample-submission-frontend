// actions should not have this much BL, will change once it gets too convoluted
import axios from 'axios'
import {
  diff,
  generateSubmitData,
  generateRows,
  generateAGColumns,
  generateGridData,
  generateSubmissionsGrid,
  updateRows,
  findSubmission,
} from '../helpers'

// make global
let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = 'https://delphi.mskcc.org/sample-receiving-backend/'
  // API_ROOT = 'https://rex.mskcc.org/apps/auth/'
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

export const REGISTER_GRID_CHANGE = 'REGISTER_GRID_CHANGE'
export const registerGridChange = changes => {
  return { type: REGISTER_GRID_CHANGE }
}

export const GET_COLUMNS = 'GET_COLUMNS'
export const GET_INITIAL_COLUMNS = 'GET_INITIAL_COLUMNS'

export const NO_CHANGE = 'NO_CHANGE'
export const NO_CHANGE_RESET = 'NO_CHANGE_RESET'

export const UPDATE_NUM_OF_ROWS = 'UPDATE_NUM_OF_ROWS'
export const UPDATE_NUM_OF_ROWS_SUCCESS = 'UPDATE_NUM_OF_ROWS_SUCCESS'

export const GET_COLUMNS_FROM_CACHE = 'GET_COLUMNS_FROM_CACHE'
export const GET_COLUMNS_SUCCESS = 'GET_COLUMNS_SUCCESS'
// export const GET_COLUMNS_INVALID_COMBINATION = 'GET_COLUMNS_INVALID_COMBINATION'
export const GET_COLUMNS_FAIL = 'GET_COLUMNS_FAIL'

export function getColumns(formValues) {
  return (dispatch, getState) => {
    // let formValues = getState().upload.form.selected
    dispatch({ type: GET_COLUMNS })

    // no grid? get inital columns
    if (getState().upload.grid.form.length == 0) {
      return dispatch(getInitialColumns(formValues))
      // TODO smell to have this in an action
    } else {
      let diffValues = diff(getState().upload.grid.form, formValues)
      if (!diffValues || Object.entries(diffValues).length === 0) {
        dispatch({ type: NO_CHANGE })
        return setTimeout(() => {
          dispatch({ type: NO_CHANGE_RESET })
        }, 1000)
      }

      //#samples -> #number rows, rest same, only update rows number
      else if (
        Object.entries(diffValues).length === 1 &&
        'number_of_samples' in diffValues
      ) {
        dispatch({ type: UPDATE_NUM_OF_ROWS })

        let rows = updateRows(formValues, getState().upload.grid)
        return dispatch({
          type: UPDATE_NUM_OF_ROWS_SUCCESS,
          rows: rows,
          form: formValues,
        })
      } else return dispatch(getInitialColumns(formValues))
    }
  }
}

export function getInitialColumns(formValues) {
  let material = formValues.material
  let application = formValues.application
  return dispatch => {
    dispatch({ type: GET_INITIAL_COLUMNS })
    material = material.replace('/', '_PIPI_SLASH_')
    application = application.replace('/', '_PIPI_SLASH_')
    return axios
      .get(API_ROOT + '/columnDefinition?', {
        params: {
          type: material,
          recipe: application,
        },
      })
      .then(response => {
        // Handsontable binds to your data source (list of arrays or list of objects) by reference. Therefore, all the data entered in the grid will alter the original data source.
        let grid = generateGridData(response.data.columnDefs, formValues)

        dispatch({
          type: GET_COLUMNS_SUCCESS,
          grid: grid,
          form: formValues,
        })
        return response
      })
      .catch(error => {
        dispatch({
          type: GET_COLUMNS_FAIL,
          error: error,
          application: application,
          material: material,
        })
        return error
      })
  }
}

export const ADD_GRID_TO_BANKED_SAMPLE = 'ADD_GRID_TO_BANKED_SAMPLE'
export const ADD_GRID_TO_BANKED_SAMPLE_FAIL = 'ADD_GRID_TO_BANKED_SAMPLE_FAIL'
export const ADD_GRID_TO_BANKED_SAMPLE_SUCCESS =
  'ADD_GRID_TO_BANKED_SAMPLE_SUCCESS'
export const BUTTON_RESET = 'BUTTON_RESET'
export function addGridToBankedSample() {
  return (dispatch, getState) => {
    dispatch({ type: ADD_GRID_TO_BANKED_SAMPLE })

    return axios
      .post(API_ROOT + '/addBankedSamples', {
        data: generateSubmitData(getState()),
      })
      .then(response => {
        // Handsontable binds to your data source (list of arrays or list of objects) by reference. Therefore, all the data entered in the grid will alter the original data source.

        dispatch({
          type: ADD_GRID_TO_BANKED_SAMPLE_SUCCESS,
        })
        return response
      })
      .catch(error => {
        dispatch({
          type: ADD_GRID_TO_BANKED_SAMPLE_FAIL,
          error: error,
        })
        return error
      })
  }
}

export const EDIT_SUBMISSION = 'EDIT_SUBMISSION'
export const EDIT_SUBMISSION_FAIL = 'EDIT_SUBMISSION_FAIL'
export const EDIT_SUBMISSION_SUCCESS = 'EDIT_SUBMISSION_SUCCESS'
export function editSubmission(id) {
  return (dispatch, getState) => {
    dispatch({ type: 'EDIT_SUBMISSION' })
    let submission = findSubmission(getState().user.submissions, id)
    if (submission) {
      return dispatch({
        type: 'EDIT_SUBMISSION_SUCCESS',
        payload: submission,
      })
    } else {
      return dispatch({
        type: 'EDIT_SUBMISSION_FAIL',
      })
    }
  }
}

export const RESET_GRID_ERROR_MESSAGE = 'RESET_GRID_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetGridErrorMessage = () => ({
  type: RESET_GRID_ERROR_MESSAGE,
})
