import * as ActionTypes from '../actions/actions'

function form(
  state = {
    isLoading: false,
    application: '',
    material: '',
    materials: [],
    applications: [],
    allMaterials: [],
    allApplications: [],
    selectedMaterial: '',
    selectApplication: '',
  },
  action
) {
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
    case ActionTypes.SELECT_APPLICATION:
      return {
        ...state,
        selectedMaterial: action.selectedApplication,
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

       case ActionTypes.RESET_MATERIALS_AND_APPLICATION:
      return {
        ...state,
        applications: state.allApplications,
        materials: state.allMaterials
      }

    default:
      return state
  }
}

export default form
