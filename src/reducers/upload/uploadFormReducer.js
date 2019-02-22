import { uploadFormActions as ActionTypes } from '../../actions'
import { initialFormState } from './initialState'

function uploadFormReducer(state = initialFormState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isLoading: true,
      }

    case ActionTypes.RECEIVE_MATERIALS_AND_APPLICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        materials: action.materials,
        applications: action.applications,
        allMaterials: action.materials,
        allApplications: action.applications,
      }

    case ActionTypes.RECEIVE_MATERIALS_AND_APPLICATIONS_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
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

    case ActionTypes.FILTER_CONTAINERS_FOR_BS:
      return {
        ...state,
        containers: state.picklists.FilteredContainersForBS,
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
    case ActionTypes.RECEIVE_MATERIALS_FOR_APPLICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        materials: action.materials,
      }
    case ActionTypes.RECEIVE_MATERIALS_FOR_APPLICATION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    case ActionTypes.REQUEST_APPLICATIONS_FOR_MATERIAL:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.RECEIVE_APPLICATIONS_FOR_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        applications: action.applications,
      }
    case ActionTypes.RECEIVE_APPLICATIONS_FOR_MATERIAL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case ActionTypes.REQUEST_PICKLIST:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.RECEIVE_PICKLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        picklists: {
          ...state.picklists,

          [action.picklist.listname]: action.picklist.values,
        },
      }

    case ActionTypes.RECEIVE_PICKLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    case ActionTypes.CLEAR_MATERIAL:
      return {
        ...state,
        applications: state.allApplications,
        materials: state.allMaterials,
        selectedMaterial: '',
        isLoading: true,
      }
    case ActionTypes.CLEAR_APPLICATION:
      return {
        ...state,
        materials: state.allMaterials,
        applications: state.allApplications,
        selectedApplication: '',
        isLoading: true,
      }
    case ActionTypes.CLEARED:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
  }
}

export default uploadFormReducer
