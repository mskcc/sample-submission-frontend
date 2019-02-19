export const initialFormState = {
  isLoading: false,
  selectedMaterial: '',
  selectApplication: '',
  materials: [],
  applications: [],
  containers: ['Plates', 'Micronic Barcoded Tubes'],
  allMaterials: [],
  allApplications: [],

  picklists: {
    Species: [],

    Containers: ['Plates', 'Micronic Barcoded Tubes', 'Blocks/Slides/Tubes'],
    FilteredContainers: ['Plates', 'Micronic Barcoded Tubes'],
    'Patient ID Format': [
      'MRN',
      'User Provided Patient ID',
      'Combination of MRN and User Provided',
      'Mouse Parental Strain ID',
    ],
  },
}
