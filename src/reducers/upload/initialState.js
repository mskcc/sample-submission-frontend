export const initialFormState = {
  all_containers: [],
  allApplications: [],
  allMaterials: [],
  applications: [],
  containers: [],
  formIsLoading: false,
  filtered_containers: [
    { id: 'Plates', value: 'Plates' },
    { id: 'Micronic Barcoded Tubes', value: 'Micronic Barcoded Tubes' },
  ],
  filtered_containers_bs: [
    { id: 'Blocks/Slides/Tubes', value: 'Blocks/Slides/Tubes' },
  ],
  materials: [],
  patient_id_formats: [],
  selectedApplication: '',
  selectedMaterial: '',
  species: [],
}

export const initialGridState = {
  columns: [],
  error: '',
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
