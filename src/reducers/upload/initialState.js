export const initialFormState = {
  allContainers: [],
  allApplications: [],
  allMaterials: [],
  allPatientIdFormats: [],
  applications: [],
  containers: [],
  formIsLoading: false,
  filteredContainers: [
    { id: 'Plates', value: 'Plates' },
    { id: 'Micronic Barcoded Tubes', value: 'Micronic Barcoded Tubes' },
  ],
  filteredContainersBS: [
    { id: 'Blocks/Slides/Tubes', value: 'Blocks/Slides/Tubes' },
  ],
  materials: [],
  picklists: {},
  selectedApplication: '',
  selectedMaterial: '',
  species: [],
  patientIDTypeNeedsFormatting: false,
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
