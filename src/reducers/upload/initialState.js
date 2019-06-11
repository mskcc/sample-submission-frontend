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
    application: '',
    material: '',
    service_id: '',
    number_of_samples: '',
    species: '',
    container: '',
    patient_id_type: '',
    grouping_checked: false,
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
