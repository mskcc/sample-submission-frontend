// actions should not have this much BL, will change once it gets too convoluted
import axios from 'axios'

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = '/apps/auth/'
  // API_ROOT = 'https://rex.mskcc.org/apps/auth/'
}
// TODO will this stay a grid action?
export const REQUEST_COLUMNS = 'REQUEST_COLUMNS'

export const NO_CHANGE = 'NO_CHANGE'
export const RECEIVE_COLUMNS_FROM_CACHE = 'RECEIVE_COLUMNS_FROM_CACHE'
export const RECEIVE_COLUMNS_CHANGE_ROWS = 'RECEIVE_COLUMNS_CHANGE_ROWS'

export const RECEIVE_COLUMNS_SUCCESS = 'RECEIVE_COLUMNS_SUCCESS'
// export const RECEIVE_COLUMNS_INVALID_COMBINATION = 'RECEIVE_COLUMNS_INVALID_COMBINATION'

export const RECEIVE_COLUMNS_FAIL = 'RECEIVE_COLUMNS_FAIL'

export function getColumns(formValues) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_COLUMNS })

    if (getState().upload.grid.form.length == 0) {
      this.getInitialColumns(formValues)
    } else if (formValues === getState().upload.grid.form) {
      dispatch({ type: NO_CHANGE })
    } else if (
      formValues.number_of_samples !==
      getState().upload.grid.form.number_of_samples
    ) {
      dispatch({ type: RECEIVE_COLUMNS_CHANGE_ROWS })

      let rows = generateRows(formValues, getState().upload.grid.columns)

      dispatch({
        type: RECEIVE_COLUMNS_CHANGE_ROWS,
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

export const RESET_GRID_ERROR_MESSAGE = 'RESET_GRID_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetGridErrorMessage = () => ({
  type: RESET_GRID_ERROR_MESSAGE,
})

export const generateRows = (formValues, columns) => {
  //  number of rows * columns
  //  fill each row with column contents
  let rows = []
  for (let i = 0; i < formValues.number_of_samples; i++) {
    for (let j = 0; j < columns.length; j++) {
      rows[i] = { ...rows[i], [columns[j].key]: '' }
    }
  }
  return rows
}
