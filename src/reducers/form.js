import {
  REQUEST_MATERIALS_AND_APPLICATIONS,
  RECEIVE_MATERIALS_AND_APPLICATIONS,
} from '../actions/actions'

function form(
  state = {
    isFetching: false,
    application: '',
    material: '',
    materials: [],
    applications: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_MATERIALS_AND_APPLICATIONS:
      return {
        ...state,
        isFetching: false,
        materials: action.materials,
        applications: action.applications,
      }
    default:
      return state
  }
}

export default form
