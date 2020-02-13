import axios from 'axios'

import { Config } from '../../config.js'
import { generatePromoteGridData } from '../helpers'

export const REQUEST_INITIAL_STATE_PROMOTE = 'REQUEST_INITIAL_STATE_PROMOTE'

export const RECEIVE_INITIAL_STATE_PROMOTE_SUCCESS =
  'RECEIVE_INITIAL_STATE_PROMOTE_SUCCESS'

export const RECEIVE_INITIAL_STATE_PROMOTE_FAIL =
  'RECEIVE_INITIAL_STATE_PROMOTE_FAIL'
export const INITIAL_STATE_PROMOTE_RETRIEVED = 'INITIAL_STATE_PROMOTE_RETRIEVED'

export function getInitialState() {
  return (dispatch, getState) => {
    if (getState().upload.promote.initialFetched)
      return dispatch({ type: INITIAL_STATE_PROMOTE_RETRIEVED })
    else {
      dispatch({ type: REQUEST_INITIAL_STATE_PROMOTE })
      return axios
        .get(Config.API_ROOT + '/allColumnsPromote')
        .then(response => {
            console.log(response)
          let grid = generatePromoteGridData(response.data.columnDefs)
          dispatch({
            type: RECEIVE_INITIAL_STATE_PROMOTE_SUCCESS,
            grid: grid,
          })
          return response
        })
        .catch(error =>
          dispatch({
            type: RECEIVE_INITIAL_STATE_PROMOTE_FAIL,
            error: error,
          })
        )
    }
  }
}

export const REQUEST_BANKED_SAMPLES = 'REQUEST_BANKED_SAMPLES'

export const RECEIVE_BANKED_SAMPLES_SUCCESS = 'RECEIVE_BANKED_SAMPLES_SUCCESS'

export const RECEIVE_BANKED_SAMPLES_FAIL = 'RECEIVE_BANKED_SAMPLES_FAIL'
export const BANKED_SAMPLES_RETRIEVED = 'BANKED_SAMPLES_RETRIEVED'

export function loadBankedSamples(serviceId) {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_BANKED_SAMPLES })
    return axios
      .get(Config.API_ROOT + '/getSamples', {
        params: { serviceId: serviceId },
      })
      .then(response => {
        console.log(response)
        
        dispatch({
          type: RECEIVE_BANKED_SAMPLES_SUCCESS,
          rows: response.data,
        })
        return response
      })
      .catch(error =>
        dispatch({
          type: RECEIVE_BANKED_SAMPLES_FAIL,
          error: error,
        })
      )
  }
}
