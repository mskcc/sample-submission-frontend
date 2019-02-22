export const getChoicesForDNALibraryMock = {
  data: {
    choices: [
      { id: 'HemePACT_v4', value: 'HemePACT_v4' },
      { id: 'M-IMPACT_v1', value: 'M-IMPACT_v1' },
      { id: 'CustomCapture', value: 'CustomCapture' },
      { id: 'IMPACT468', value: 'IMPACT468' },
      { id: 'MethylMiner', value: 'MethylMiner' },
      { id: 'QC_Discard', value: 'QC_Discard' },
      { id: 'WholeExomeSequencing', value: 'WholeExomeSequencing' },
      {
        id: 'WholeGenomeBisulfateSequencing',
        value: 'WholeGenomeBisulfateSequencing',
      },
      { id: 'AmpliconSeq', value: 'AmpliconSeq' },
      { id: 'ATACSeq', value: 'ATACSeq' },
      { id: 'ChIPSeq', value: 'ChIPSeq' },
      { id: 'ddPCR', value: 'ddPCR' },
      { id: 'DropSeq', value: 'DropSeq' },
      { id: 'RNASeq', value: 'RNASeq' },
      { id: 'Spo11Oligo', value: 'Spo11Oligo' },
      { id: 'shRNASeq', value: 'shRNASeq' },
      { id: 'WholeGenomeSequencing', value: 'WholeGenomeSequencing' },
      { id: 'ShallowWGS', value: 'ShallowWGS' },
      { id: 'RRBS', value: 'RRBS' },
      { id: 'ImmunoSeq', value: 'ImmunoSeq' },
      { id: 'CRISPRScreen', value: 'CRISPRScreen' },
      {
        id: '10X_Genomics_GeneExpression',
        value: '10X_Genomics_GeneExpression',
      },
      { id: '10X_Genomics_WGS', value: '10X_Genomics_WGS' },
      { id: 'Fingerprinting', value: 'Fingerprinting' },
      { id: '10X_Genomics_ATAC', value: '10X_Genomics_ATAC' },
    ],
  },
}

export const initialFormStateMock = {
  isLoading: false,
  selectedMaterial: '',
  selectedApplication: '',
  materials: [],
  applications: [],
  containers: ['Plates', 'Micronic Barcoded Tubes'],
  allMaterials: [],
  allApplications: [],

  picklists: {
    Species: [],

    Containers: ['Plates', 'Micronic Barcoded Tubes', 'Blocks/Slides/Tubes'],
    FilteredContainers: ['Plates', 'Micronic Barcoded Tubes'],
    FilteredContainersForBS: ['Blocks/Slides/Tubes'],
    'Patient ID Format': [
      'MRN',
      'User Provided Patient ID',
      'Combination of MRN and User Provided',
      'Mouse Parental Strain ID',
    ],
  },
}
