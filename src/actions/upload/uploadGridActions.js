// actions should not have this much BL, will change once it gets too convoluted
import axios from 'axios'
import {
  diff,
  findSubmission,
  generateSubmitData,
  generateRows,
  generateAGColumns,
  generateGridData,
  generateSubmissionsGrid,
  updateRows,
  redactMRN,
  appendAssay,
  findIndexSeq,
} from '../helpers'

// make global
// let Config.API_ROOT = 'http://localhost:9004'
// if (process.env.NODE_ENV === 'production') {
//   Config.API_ROOT = 'https://delphi.mskcc.org/sample-receiving-backend/'
//   // Config.API_ROOT = 'https://rex.mskcc.org/apps/auth/'
// }

import { Config } from '../../config.js'

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
      .get(Config.API_ROOT + '/columnDefinition?', {
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
      .post(Config.API_ROOT + '/addBankedSamples', {
        data: generateSubmitData(getState()),
      })
      .then(response => {
        // Handsontable binds to your data source (list of arrays or list of objects)
        // by reference. Therefore, all the data entered in the grid
        // will alter the original data source.

        dispatch({
          type: ADD_GRID_TO_BANKED_SAMPLE_SUCCESS,
          message: 'Submitted! Check your submissions.',
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
export function editSubmission(id, ownProps) {
  return (dispatch, getState) => {
    dispatch({ type: 'EDIT_SUBMISSION' })
    let submission = findSubmission(getState().user.submissions, id)
    if (submission) {
      //  decided to rebuild grid instead of saving colFeatues and headers to avoid version
      dispatch(getInitialColumns(JSON.parse(submission.form_values))).then(
        () => {
          dispatch({
            type: 'EDIT_SUBMISSION_SUCCESS',
            payload: submission,
          })
          return ownProps.history.push('upload')
        }
      )
    } else {
      return dispatch({
        type: 'EDIT_SUBMISSION_FAIL',
      })
    }
  }
}

export const HANDLE_MRN = 'HANDLE_MRN'
export const HANDLE_MRN_FAIL = 'HANDLE_MRN_FAIL'
export const HANDLE_MRN_SUCCESS = 'HANDLE_MRN_SUCCESS'
export function handleMRN(rowIndex) {
  return (dispatch, getState) => {
    dispatch({ type: 'HANDLE_MRN' })
    return axios
      .post(
        Config.API_ROOT + '/patientIdConverter',

        {
          data: {
            patient_id: getState().upload.grid.rows[rowIndex].patientId,
          },
        }
      )
      .then(response => {
        dispatch({
          type: HANDLE_MRN_SUCCESS,
          message: 'MRN redacted.',
          rows: redactMRN(
            getState().upload.grid.rows,
            rowIndex,
            response.data.patient_id,
            'MRN REDACTED'
          ),
        })
      })
      .catch(error => {
        dispatch({
          type: HANDLE_MRN_FAIL,

          error: error,
          rows: redactMRN(
            getState().upload.grid.rows,
            rowIndex,
            '',
            'MRN INVALID'
          ),
        })
        return error
      })
  }
}

export const HANDLE_ASSAY = 'HANDLE_ASSAY'
// export const HANDLE_ASSAY_FAIL = 'HANDLE_ASSAY_FAIL'
// export const HANDLE_ASSAY_SUCCESS = 'HANDLE_ASSAY_SUCCESS'
export function handleAssay(rowIndex, oldValue, newValue) {
  return (dispatch, getState) => {
    return dispatch({
      type: 'HANDLE_ASSAY_SUCCESS',
      rows: appendAssay(
        getState().upload.grid.rows,
        rowIndex,
        oldValue,
        newValue
      ),
    })
  }
}

export const HANDLE_INDEX_SUCCESS = 'HANDLE_INDEX_SUCCESS'
export const HANDLE_INDEX_FAIL = 'HANDLE_INDEX_FAIL'
export function handleIndex(colIndex, rowIndex, newValue) {
  return (dispatch, getState) => {
    let indexSeq = findIndexSeq(
      getState().upload.grid,
      colIndex,
      rowIndex,
      newValue
    )
    if (indexSeq.success) {
      return dispatch({
        type: HANDLE_INDEX_SUCCESS,
        rows: indexSeq.rows,
      })
    } else {
      return dispatch({
        type: HANDLE_INDEX_FAIL,
        message:
          'Index Sequence could not be found. Are you sure the Index ID is correct?',
      })
    }
  }
}

export const RESET_GRID_ERROR_MESSAGE = 'RESET_GRID_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetGridErrorMessage = () => ({
  type: RESET_GRID_ERROR_MESSAGE,
})
