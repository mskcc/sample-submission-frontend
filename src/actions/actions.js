//TODO ERROR HANDLING
import axios from 'axios'

const API_ROOT = 'http://localhost:9004/'

export const SELECT_MATERIAL = 'SELECT_MATERIAL'
export const SELECT_APPLICATION = 'SELECT_APPLICATION'

export function selectMaterial(selectedMaterial) {
  return {
    type: SELECT_MATERIAL,
    selectedMaterial,
  }
}

export function selectApplication(selectedApplication) {
  return {
    type: SELECT_APPLICATION,
    selectedApplication,
  }
}

export const REQUEST_MATERIALS_AND_APPLICATIONS =
  'REQUEST_MATERIALS_AND_APPLICATIONS'
function requestMaterialsAndApplications() {
  return {
    type: REQUEST_MATERIALS_AND_APPLICATIONS,
  }
}

export const RECEIVE_MATERIALS_AND_APPLICATIONS =
  'RECEIVE_MATERIALS_AND_APPLICATIONS'
function receiveMaterialsAndApplications(response) {
  return {
    type: RECEIVE_MATERIALS_AND_APPLICATIONS,
    materials: response.samples,
    applications: response.sequencing,
  }
}

export function getMaterialsAndApplications() {
  return dispatch => {
    dispatch(requestMaterialsAndApplications())
    return axios
      .get(API_ROOT + '/sequencingAndSampleTypes')
      .then(response =>
        dispatch(receiveMaterialsAndApplications(response.data))
      )
      .catch(function(error) {
        console.log(error)
      })
  }
}

// get materials that can be combined with application
export const REQUEST_MATERIALS_FOR_APPLICATION =
  'REQUEST_MATERIALS_FOR_APPLICATION'
function requestMaterialsForApplication() {
  return {
    type: REQUEST_MATERIALS_FOR_APPLICATION,
    
  }
}

export const RECEIVE_MATERIALS_FOR_APPLICATION =
  'RECEIVE_MATERIALS_FOR_APPLICATION'
function receiveMaterialsForApplication(response) {
  return {
    type: RECEIVE_MATERIALS_FOR_APPLICATION,
    materials: response.choices,
  }
}

export function getMaterialsForApplication(selectedApplication) {
  return dispatch => {
    dispatch(selectApplication(selectedApplication))
    dispatch(requestMaterialsForApplication())
    return axios
      .get(API_ROOT + '/columnDefinition', {
        params: {
          recipe: selectedApplication.replace('/', '_PIPI_SLASH_'),
        },
      })
      .then(response => dispatch(receiveMaterialsForApplication(response.data)))
      .catch(function(error) {
        console.log(error)
      })
  }
}

export const REQUEST_APPLICATIONS_FOR_MATERIAL =
  'REQUEST_APPLICATIONS_FOR_MATERIAL'
// get applications that can be combined with material
function requestApplicationsForMaterial(selectedMaterial) {
  return {
    type: REQUEST_APPLICATIONS_FOR_MATERIAL,
    selectMaterial,
  }
}

export const RECEIVE_APPLICATIONS_FOR_MATERIAL =
  'RECEIVE_APPLICATIONS_FOR_MATERIAL'
function receiveApplicationsForMaterial(response) {
  return {
    type: RECEIVE_APPLICATIONS_FOR_MATERIAL,
    applications: response.choices,
  }
}

// SelectedMaterial impacts applications and containers, containers are filtered in FormContainer
export function getApplicationsForMaterial(selectedMaterial) {
  return dispatch => {
    dispatch(selectMaterial(selectedMaterial))
    dispatch(requestApplicationsForMaterial())
    return axios
      .get(API_ROOT + '/columnDefinition', {
        params: {
          type: selectedMaterial.replace('/', '_PIPI_SLASH_'),
        },
      })
      .then(response => dispatch(receiveApplicationsForMaterial(response.data)))
      .catch(function(error) {
        console.log(error)
      })
  }
}

export const REQUEST_PICKLIST = 'REQUEST_PICKLIST'
// get applications that can be combined with material
function requestPicklist(picklist) {
  return {
    type: REQUEST_PICKLIST,
    picklist,
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

export const RECEIVE_PICKLIST = 'RECEIVE_PICKLIST'
export const RECEIVE_SPECIES_PICKLIST = 'RECEIVE_SPECIES_PICKLIST'
// export const RECEIVE_PICKLIST =
// 'RECEIVE_PICKLIST'
// export const RECEIVE_PICKLIST =
// 'RECEIVE_PICKLIST'
// export const RECEIVE_PICKLIST =
// 'RECEIVE_PICKLIST'
// export const RECEIVE_PICKLIST =
// 'RECEIVE_PICKLIST'
function receivePicklist(response, picklist) {
  return {
    type: RECEIVE_PICKLIST,
    picklist: response,
  }
}

export function getPicklist(picklist) {
  return dispatch => {
    dispatch(requestPicklist(picklist))
    return axios
      .get(API_ROOT + 'listValues/' + picklist)

      .then(response => dispatch(receivePicklist(response.data, picklist)))
      .catch(function(error) {
        console.log(error)
      })
  }
}

export const CLEAR_MATERIALS = 'CLEAR_MATERIALS'

export const clearMaterial = () => ({
  type: CLEAR_MATERIALS,
})

export const CLEAR_APPLICATION = 'CLEAR_APPLICATION'

export const clearApplication = () => ({
  type: CLEAR_APPLICATION,
})

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
})
