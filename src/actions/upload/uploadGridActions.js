// actions should not have this much BL, will change once it gets too convoluted
import axios from 'axios'
import { generateRows, diff } from './helpers'

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = '/apps/auth/'
  // API_ROOT = 'https://rex.mskcc.org/apps/auth/'
}
// TODO will this stay a grid action?
export const REQUEST_COLUMNS = 'REQUEST_COLUMNS'

export const NO_CHANGE = 'NO_CHANGE'
export const NO_CHANGE_RESET = 'NO_CHANGE_RESET'

export const UPDATE_NUM_OF_ROWS = 'UPDATE_NUM_OF_ROWS'
export const UPDATE_NUM_OF_ROWS_SUCCESS = 'UPDATE_NUM_OF_ROWS_SUCCESS'

export const RECEIVE_COLUMNS_FROM_CACHE = 'RECEIVE_COLUMNS_FROM_CACHE'
export const RECEIVE_COLUMNS_SUCCESS = 'RECEIVE_COLUMNS_SUCCESS'
// export const RECEIVE_COLUMNS_INVALID_COMBINATION = 'RECEIVE_COLUMNS_INVALID_COMBINATION'
export const RECEIVE_COLUMNS_FAIL = 'RECEIVE_COLUMNS_FAIL'

export function getColumns(formValues) {
  return (dispatch, getState) => {
    let diffValues = diff(getState().upload.grid.form, formValues)
    dispatch({ type: REQUEST_COLUMNS })
    if (getState().upload.grid.form.length == 0) {
      this.getInitialColumns(formValues)
    } else if (diffValues === undefined) {
      dispatch({ type: NO_CHANGE })
      return setTimeout(() => {
        dispatch({ type: NO_CHANGE_RESET })
      }, 1000)
    }
    //#samples -> #number rows, rest same, only update rows number
    else if (
      Object.keys(diffValues).length === 1 &&
      'number_of_samples' in diffValues
    ) {
      dispatch({ type: UPDATE_NUM_OF_ROWS })
      let rows = generateRows(formValues, getState().upload.grid.columns)
      dispatch({
        type: UPDATE_NUM_OF_ROWS_SUCCESS,
        rows: rows,
        form: formValues,
      })
    } else {
      this.getInitialColumns(formValues)
    }
  }
}

export function getInitialColumns(formValues) {
  let material = formValues.material
  let application = formValues.application
  return dispatch => {
    dispatch({ type: REQUEST_COLUMNS })
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
        let rows = generateRows(formValues, response.data.columnDefs)

        dispatch({
          type: RECEIVE_COLUMNS_SUCCESS,
          columns: response.data.columnDefs,
          rows: rows,
          form: formValues,
        })

        return response
      })
      .catch(error => {
        dispatch({
          type: RECEIVE_COLUMNS_FAIL,
          error: error.response.data,
          application: application,
          material: material,
        })
        return error
      })
  }
}

export const UPDATE_CELLS = 'UPDATE_CELLS'
export function updateCells(rows) {
  console.log(rows)
  return {
    type: 'UPDATE_CELLS',
    rows: rows,
  }
}

export const RESET_GRID_ERROR_MESSAGE = 'RESET_GRID_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetGridErrorMessage = () => ({
  type: RESET_GRID_ERROR_MESSAGE,
})
