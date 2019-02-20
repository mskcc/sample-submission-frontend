//TODO ERROR HANDLING
import axios from 'axios'

const API_ROOT = 'http://localhost:9004/'

export const REQUEST_MATERIALS_AND_APPLICATIONS =
  'REQUEST_MATERIALS_AND_APPLICATIONS'

export const RECEIVE_MATERIALS_AND_APPLICATIONS_SUCCESS =
  'RECEIVE_MATERIALS_AND_APPLICATIONS_SUCCESS'

export const RECEIVE_MATERIALS_AND_APPLICATIONS_FAIL =
  'RECEIVE_MATERIALS_AND_APPLICATIONS_FAIL'

export function getMaterialsAndApplications() {
  return dispatch => {
    dispatch({ type: REQUEST_MATERIALS_AND_APPLICATIONS })
    return axios
      .get(API_ROOT + '/sequencingAndSampleTypes')
      .then(response =>
        dispatch({
          type: RECEIVE_MATERIALS_AND_APPLICATIONS_SUCCESS,
          materials: response.data.samples,
          applications: response.data.sequencing,
        })
      )
      .catch(error =>
        dispatch({
          type: RECEIVE_MATERIALS_AND_APPLICATIONS_FAIL,
          error: error,
        })
      )
  }
}

// get materials that can be combined with application

export const REQUEST_MATERIALS_FOR_APPLICATION =
  'REQUEST_MATERIALS_FOR_APPLICATION'

export const SELECT_APPLICATION = 'SELECT_APPLICATION'

export const RECEIVE_MATERIALS_FOR_APPLICATION_SUCCESS =
  'RECEIVE_MATERIALS_FOR_APPLICATION_SUCCESS'

export const RECEIVE_MATERIALS_FOR_APPLICATION_FAIL =
  'RECEIVE_MATERIALS_FOR_APPLICATION_FAIL'

export function getMaterialsForApplication(selectedApplication) {
  return dispatch => {
    dispatch({ type: SELECT_APPLICATION, selectedApplication })
    dispatch({ type: REQUEST_MATERIALS_FOR_APPLICATION })
    return axios
      .get(API_ROOT + '/columnDefinition', {
        params: {
          recipe: selectedApplication.replace('/', '_PIPI_SLASH_'),
        },
      })
      .then(response =>
        dispatch({
          type: RECEIVE_MATERIALS_FOR_APPLICATION_SUCCESS,
          materials: response.data.choices,
        })
      )
      .catch(error =>
        dispatch({
          type: RECEIVE_MATERIALS_FOR_APPLICATION_FAIL,
          error: error,
        })
      )
  }
}

export const SELECT_MATERIAL = 'SELECT_MATERIAL'

export const REQUEST_APPLICATIONS_FOR_MATERIAL =
  'REQUEST_APPLICATIONS_FOR_MATERIAL'

export const RECEIVE_APPLICATIONS_FOR_MATERIAL_SUCCESS =
  'RECEIVE_APPLICATIONS_FOR_MATERIAL_SUCCESS'

export const RECEIVE_APPLICATIONS_FOR_MATERIAL_FAIL =
  'RECEIVE_APPLICATIONS_FOR_MATERIAL_FAIL'

// get applications that can be combined with material
// SelectedMaterial impacts applications and containers, containers are filtered in FormContainer
export function getApplicationsForMaterial(selectedMaterial) {
  return dispatch => {
    dispatch({ type: SELECT_MATERIAL, selectedMaterial })
    dispatch({ type: REQUEST_APPLICATIONS_FOR_MATERIAL })
    return axios
      .get(API_ROOT + '/columnDefinition', {
        params: {
          type: selectedMaterial.replace('/', '_PIPI_SLASH_'),
        },
      })
      .then(response =>
        dispatch({
          type: RECEIVE_APPLICATIONS_FOR_MATERIAL_SUCCESS,
          applications: response.data.choices,
        })
      )
      .catch(error =>
        dispatch({
          type: RECEIVE_APPLICATIONS_FOR_MATERIAL_FAIL,
          error: error,
        })
      )
  }
}

export const FILTER_CONTAINERS = 'FILTER_CONTAINERS'
export const SHOW_ALL_CONTAINERS = 'SHOW_ALL_CONTAINERS'
export function showAllContainers(show) {
  if (show) {
    return {
      type: SHOW_ALL_CONTAINERS,
    }
  } else
    return {
      type: FILTER_CONTAINERS,
    }
}

export const REQUEST_PICKLIST = 'REQUEST_PICKLIST'
export const RECEIVE_PICKLIST_SUCCESS = 'RECEIVE_PICKLIST_SUCCESS'
export const RECEIVE_PICKLIST_FAIL = 'RECEIVE_PICKLIST_FAIL'

export function getPicklist(picklist) {
  return dispatch => {
    dispatch({ type: REQUEST_PICKLIST, picklist })
    return axios
      .get(API_ROOT + 'listValues/' + picklist)

      .then(response =>
        dispatch({ type: RECEIVE_PICKLIST_SUCCESS, picklist: response.data })
      )
      .catch(error =>
        dispatch({
          type: RECEIVE_PICKLIST_FAIL,
          error: error,
        })
      )
  }
}

export const CLEAR_MATERIAL = 'CLEAR_MATERIAL'

export const clearMaterial = () => {
  return dispatch => {
    dispatch({ type: CLEAR_MATERIAL })
    dispatch(cleared())
  }
}

export const CLEAR_APPLICATION = 'CLEAR_APPLICATION'

export const clearApplication = () => {
  return dispatch => {
    dispatch({ type: CLEAR_APPLICATION })
    dispatch(cleared())
  }
}

export const CLEARED = 'CLEARED'
// timeout for CLEARED to show user loading animation to indicate change
export const cleared = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: CLEARED })
    }, 500)
  }
}
