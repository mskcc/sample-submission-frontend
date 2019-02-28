export const initialFormState = {
  formIsLoading: false,
  selectedMaterial: '',
  selectedApplication: '',
  materials: [],
  applications: [],
  allMaterials: [],
  allApplications: [],
  containers: [],
  all_containers: [],
  species: [],
  filtered_containers: [
    { id: 'Plates', value: 'Plates' },
    { id: 'Micronic Barcoded Tubes', value: 'Micronic Barcoded Tubes' },
  ],
  filtered_containers_bs: [
    { id: 'Blocks/Slides/Tubes', value: 'Blocks/Slides/Tubes' },
  ],
  patient_id_formats: [],
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
