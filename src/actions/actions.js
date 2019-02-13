//TODO ERROR HANDLING
import fetch from 'cross-fetch'
import 'babel-polyfill'

const API_ROOT = 'http://localhost:9004/'

export const REQUEST_MATERIALS_AND_APPLICATIONS =
  'REQUEST_MATERIALS_AND_APPLICATIONS'
export const RECEIVE_MATERIALS_AND_APPLICATIONS =
  'RECEIVE_MATERIALS_AND_APPLICATIONS'
export const SELECT_MATERIAL = 'SELECT_MATERIAL'
export const SELECT_APPLICATION = 'SELECT_APPLICATION'
export const REQUEST_MATERIALS = 'REQUEST_MATERIALS'
export const REQUEST_APPLICATIONS = 'REQUEST_APPLICATIONS'

export function selectMaterial(material) {
  return {
    type: SELECT_MATERIAL,
    selecteMaterial,
  }
}

export function selectApplication(application) {
  return {
    type: SELECT_APPLICATION,
    selectedApplication,
  }
}

function requestMaterialsAndApplications() {
  return {
    type: REQUEST_MATERIALS_AND_APPLICATIONS,
  }
}

function receiveMaterialsAndApplications(json) {
  return {
    type: RECEIVE_MATERIALS_AND_APPLICATIONS,
    materials: json.samples,
    applications: json.sequencing,
  }
}

// fetch materials that can be combined with application
function requestMaterials(application) {
  return {
    type: REQUEST_MATERIALS,
    application,
  }
}

// fetch applications that can be combined with material
function requestApplications(material) {
  return {
    type: REQUEST_APPLICATIONS,
    material,
  }
}

export function fetchMaterialsAndApplications() {
  return dispatch => {
    dispatch(requestMaterialsAndApplications())
    return fetch(API_ROOT + '/sequencingAndSampleTypes')
      .then(response => response.json())
      .then(json => dispatch(receiveMaterialsAndApplications(json)))
  }
}



export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})