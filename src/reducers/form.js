import * as ActionTypes from '../actions/actions'
import { initialFormState } from './initialState'

function form(state = initialFormState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isLoading: true,
      }

    case ActionTypes.RECEIVE_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isLoading: false,
        materials: action.materials,
        applications: action.applications,
        allMaterials: action.materials,
        allApplications: action.applications,
      }

    case ActionTypes.SELECT_MATERIAL:
      return {
        ...state,
        selectedMaterial: action.selectedMaterial,
      }

    case ActionTypes.FILTER_CONTAINERS:
      return {
        ...state,
        containers: state.picklists.FilteredContainers,
      }
    case ActionTypes.SHOW_ALL_CONTAINERS:
      return {
        ...state,
        containers: state.picklists.Containers,
      }
    case ActionTypes.SELECT_APPLICATION:
      return {
        ...state,
        selectedApplication: action.selectedApplication,
      }

    case ActionTypes.REQUEST_MATERIALS_FOR_APPLICATION:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.RECEIVE_MATERIALS_FOR_APPLICATION:
      return {
        ...state,
        isLoading: false,
        materials: action.materials,
      }

    case ActionTypes.REQUEST_APPLICATIONS_FOR_MATERIAL:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.RECEIVE_APPLICATIONS_FOR_MATERIAL:
      return {
        ...state,
        isLoading: false,
        applications: action.applications,
      }
    case ActionTypes.REQUEST_PICKLIST:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.RECEIVE_PICKLIST:
      return {
        ...state,
        isLoading: false,
        picklists: {
          ...state.picklists,

          [action.picklist.listname]: action.picklist.values,
        },
      }

    case ActionTypes.CLEAR_MATERIALS:
      return {
        ...state,
        applications: state.allApplications,
        materials: state.allMaterials,
        selectedMaterial: '',
      }
    case ActionTypes.CLEAR_APPLICATION:
      return {
        ...state,
        materials: state.allMaterials,
        applications: state.allApplications,
        selectedApplication: '',
      }

    default:
      return state
  }
}

export default form
