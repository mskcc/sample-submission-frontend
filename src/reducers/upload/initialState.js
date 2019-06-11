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
  filteredSpecies: [],
  patientIDTypeNeedsFormatting: false,
  selected: {
    application: 'AmpliSeq',
    material: 'DNA',
    igo_request_id: '898989',
    number_of_samples: '10',
    species: 'Mouse',
    container: 'Plates',
    patient_id_type: '',
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
