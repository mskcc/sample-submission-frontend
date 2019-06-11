export const initialFormState = {
  allContainers: [],
  allApplications: [],
  allMaterials: [],
  allPatientIdFormats: [],
  filteredApplications: [],
  containers: [],
  filteredContainers: [],
  formIsLoading: false,

  filteredMaterials: [],
  picklists: {},

  allSpecies: [],
  filteredSpecies: [],
  
  patientIDTypeNeedsFormatting: false,
  // selected: {
  //   application: 'AmpliSeq',
  //   material: 'DNA',
  //   service_id: '898989',
  //   number_of_samples: '10',
  //   species: 'Mouse',
  //   container: 'Plates',
  //   patient_id_type: '',
  //   grouping_checked: false,
  // },
    selected: {
    application: undefined,
    material: undefined,
    service_id: undefined,
    number_of_samples: undefined,
    species: undefined,
    container: undefined,
    patient_id_type: undefined,
    grouping_checked: undefined,
  },
}

export const initialGridState = {
  columns: [],
  rows: [],
  gridError: '',
  form: [],
  gridIsLoading: false,
  isSaving: false,
  nothingToChange: false,
}
