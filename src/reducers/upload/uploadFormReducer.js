import { uploadFormActions as ActionTypes } from '../../actions'
import { initialFormState } from './initialState'

function uploadFormReducer(state = initialFormState, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_INITIAL_STATE:
      return {
        ...state,
        isLoading: true,
      }

    case ActionTypes.RECEIVE_INITIAL_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        materials: action.data.materials,
        applications: action.data.applications,
        allMaterials: action.data.materials,
        allApplications: action.data.applications,
        species: action.data.species,
        all_containers: action.data.containers,
        containers: action.data.containers,
        patient_id_formats: action.data.patient_id_formats,
      }

    case ActionTypes.RECEIVE_INITIAL_STATE_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }

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
        containers: state.filtered_containers,
      }

    case ActionTypes.FILTER_CONTAINERS_FOR_BS:
      return {
        ...state,
        containers: state.filtered_containers_bs,
      }
    case ActionTypes.SHOW_ALL_CONTAINERS:
      return {
        ...state,
        containers: state.all_containers,
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

    case ActionTypes.REQUEST_COLUMNS:
      return {
        ...state,
        isLoading: true,
      }
    case ActionTypes.RECEIVE_COLUMNS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        columns: {
          ...state.columns,

          ...[action.columns],
        },
      }

    case ActionTypes.RECEIVE_COLUMNS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    case ActionTypes.CLEAR_MATERIAL:
      return {
        ...state,
        applications: state.allApplications,
        selectedMaterial: '',
        isLoading: true,
      }
    case ActionTypes.CLEAR_APPLICATION:
      return {
        ...state,
        materials: state.allMaterials,
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
