export const initialFormState = {
  isLoading: false,
  selectedMaterial: '',
  selectApplication: '',
  materials: [],
  applications: [],
  allMaterials: [],
  allApplications: [],

  picklists: {
    Species: [],
    Containers: ['Plates', 'Micronic Barcoded Tubes', 'Blocks/Slides/Tubes'],
    'Patient ID Format': [
      'MRN',
      'User Provided Patient ID',
      'Combination of MRN and User Provided',
      'Mouse Parental Strain ID',
    ],
  },
}
