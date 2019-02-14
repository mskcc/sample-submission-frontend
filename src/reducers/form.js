import * as ActionTypes from '../actions/actions'

function form(
  state = {
    isFetching: false,
    application: '',
    material: '',
    materials: [],
    applications: [],
    selectedMaterial: '',
    selectApplication: '',
  },
  action
) {
  switch (action.type) {
    case ActionTypes.REQUEST_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isFetching: true,
      }

    case ActionTypes.RECEIVE_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isFetching: false,
        materials: action.materials,
        applications: action.applications,
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
        isFetching: true,
      }
    case ActionTypes.RECEIVE_MATERIALS_FOR_APPLICATION:
      return {
        ...state,
        isFetching: false,
        materials: action.materials,
      }

    case ActionTypes.REQUEST_APPLICATIONS_FOR_MATERIAL:
      return {
        ...state,
        isFetching: true,
      }
    case ActionTypes.RECEIVE_APPLICATIONS_FOR_MATERIAL:
      return {
        ...state,
        isFetching: false,
        applications: action.applications,
      }

    default:
      return state
  }
}

export default form
