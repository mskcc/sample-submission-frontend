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
  selectedApplication: '',
  selectedMaterial: '',
  species: [],
  patientIdNeedsFormatting: false,
}

export const initialGridState = {
  columns: [],
  rows: [],
  error: '',
  form: [],
}

// picklists: {
//     Species: [],

//     Containers: ['Plates', 'Micronic Barcoded Tubes', 'Blocks/Slides/Tubes'],
//     FilteredContainers: ['Plates', 'Micronic Barcoded Tubes'],
//     FilteredContainersForBS: ['Blocks/Slides/Tubes'],
//     'Patient ID Format': [
//       'MRN',
//       'User Provided Patient ID',
//       'Combination of MRN and User Provided',
//       'Mouse Parental Strain ID',
//     ],
//   },
