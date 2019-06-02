export const initialFormState = {
  allContainers: [],
  allApplications: [],
  allMaterials: [],
  allPatientIdFormats: [],
  filteredApplications: [],
  containers: [],
  formIsLoading: false,
  filteredContainers: [
    { id: 'Plates', value: 'Plates' },
    { id: 'Micronic Barcoded Tubes', value: 'Micronic Barcoded Tubes' },
  ],
  filteredContainersBS: [
    { id: 'Blocks/Slides/Tubes', value: 'Blocks/Slides/Tubes' },
  ],
  filteredMaterials: [],
  picklists: {},

  allSpecies: [],
  patientIDTypeNeedsFormatting: false,
  selected: {
    application: '',
    material: '',
    igo_request_id: '',
    number_of_samples: '',
    species: '',
    container: '',
    patient_id_type: '',
  },
}

export const initialGridState = {
  columns: [],
  rows: [],
  error: '',
  form: [],
  gridIsLoading: false,
  isSaving: false,
  nothingToChange: false,
}
