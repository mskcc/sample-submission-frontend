export const getChoicesForDNALibraryMock = {
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
}
export const initialFormStateMock = {
  allContainers: [],
  allApplications: [],
  allMaterials: [],
  allPatientIdFormats: [],
  applications: [],
  containers: [],
  formIsLoading: true,
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
  patientIDTypeNeedsFormatting: false,
}

export const initialGridStateMock = {
  columns: [],
  rows: [],
  error: '',
  form: [],
  gridIsLoading: false,
  nothingToChange: false,
}

export const filledGridStateMock = {
  upload: {
    grid: {
      columns: ['Block/Slide/TubeID', 'Sample ID'],
      rows: [
        { tubeId: '', userId: '' },
        { tubeId: '', userId: '' },
        { tubeId: '', userId: '' },
        { tubeId: '', userId: '' },
      ],
      error: '',
      form: {
        material: 'Tissue',
        application: 'CustomCapture',
        igo_request_id: '444444',
        number_of_samples: '4',
        species: 'Tuberculosis',
        container: 'Plates',
        patient_id_type: '',
      },
      gridIsLoading: false,
      nothingToChange: false,
      columnFeatures: [
        {
          columnHeader: 'Block/Slide/TubeID',
          data: 'tubeId',
        },
        {
          columnHeader: 'Sample ID',
          data: 'userId',
        },
      ],
    },
  },
}

export const initialFullStateMock = {
  upload: {
    form: {
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
      patientIDTypeNeedsFormatting: false,
    },
    grid: {
      columns: [],
      rows: [],
      error: '',
      form: [],
      gridIsLoading: false,
      nothingToChange: false,
    },
  },
}

export const filledFullStateMock = {
  upload: {
    form: {
      allContainers: [{ id: 'test', value: 'test' }],
      allApplications: [{ id: 'test', value: 'test' }],
      allMaterials: [{ id: 'test', value: 'test' }],
      allPatientIdFormats: [{ id: 'test', value: 'test' }],
      applications: [{ id: 'test', value: 'test' }],
      containers: [{ id: 'test', value: 'test' }],
      formIsLoading: false,
      filteredContainers: [
        { id: 'Plates', value: 'Plates' },
        { id: 'Micronic Barcoded Tubes', value: 'Micronic Barcoded Tubes' },
      ],
      filteredContainersBS: [
        { id: 'Blocks/Slides/Tubes', value: 'Blocks/Slides/Tubes' },
      ],
      materials: [{ id: 'test', value: 'test' }],
      selectedApplication: '',
      selectedMaterial: '',
      species: [{ id: 'test', value: 'test' }],
      patientIDTypeNeedsFormatting: false,
    },
    grid: {
      columns: ['Block/Slide/TubeID', 'Sample ID'],
      rows: [{ tubeId: '', userId: '' }, { tubeId: '', userId: '' }],
      error: '',
      form: {
        material: 'Tissue',
        application: 'CustomCapture',
        igo_request_id: '444444',
        number_of_samples: '4',
        species: 'Tuberculosis',
        container: 'Plates',
        patient_id_type: '',
      },
      gridIsLoading: false,
      nothingToChange: false,
      columnFeatures: [
        {
          columnHeader: 'Block/Slide/TubeID',
          data: 'tubeId',

          name: 'Block/Slide/TubeID',
        },
        {
          columnHeader: 'Sample ID',
          data: 'userId',
        },
      ],
    },
  },
}

export const formValuesMock = {
  application: 'CustomCapture',
  container: 'Plates',
  igo_request_id: '444444',
  material: 'Tissue',
  number_of_samples: '2',
  patient_id_type: '',
  species: 'Tuberculosis',
}

export const columnDefsResponseMock = {
  columnDefs: [
    {
      columnHeader: 'Block/Slide/TubeID',
      data: 'tubeId',
      editableCellTemplate:
        '<div><form name="inputForm"><input class="form-control inputheight" type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" ng-paste="grid.appScope.handleCellPaste($event)"></form></div>',
      headerCellClass: 'required',
      helpText:
        'The identifier on your tube, block or slide.  You can paste in directly from excel, and there are no formatting rules.  Please be as correct as possible, and ensure your tubes, blocks and slides are labeled clearly.',
      name: 'Block/Slide/TubeID',
    },
    {
      columnHeader: 'Sample ID',
      data: 'userId',
      editableCellTemplate:
        '<div><form name="inputForm"><input class="form-control inputheight" type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" ng-paste="grid.appScope.handleCellPaste($event)"></form></div>',
      headerCellClass: 'required',
      helpText:
        'The Sample ID stays with your sample for its lifetime. Letters, numbers, dashes, and underscores only, three char min. You cannot have more than one underscore consecutively.',
      name: 'Sample ID',
    },
    {
      columnHeader: 'Species',
      data: 'organism',
      editableCellTemplate: 'ui-grid/dropdownEditor',
      headerCellClass: 'required',
      helpText:
        'If your species is not available, please contact IGO immediately',
      name: 'Species',
      picklistName: 'Species',
      source: [
        { id: 'Human', value: 'Human' },
        { id: 'Mouse', value: 'Mouse' },
        { id: 'Mouse_GeneticallyModified', value: 'Mouse_GeneticallyModified' },
        { id: 'Drosophilia', value: 'Drosophilia' },
        { id: 'Zebrafish', value: 'Zebrafish' },
        { id: 'Chicken', value: 'Chicken' },
        { id: 'Bacteria', value: 'Bacteria' },
        { id: 'S.Cerevisae', value: 'S.Cerevisae' },
        { id: 'Tuberculosis', value: 'Tuberculosis' },
        { id: 'E.Coli ', value: 'E.Coli ' },
        { id: 'C.Elegans', value: 'C.Elegans' },
        { id: 'S.Pombe', value: 'S.Pombe' },
        { id: 'R.norvegicus', value: 'R.norvegicus' },
        { id: 'R.rattus', value: 'R.rattus' },
        { id: 'Plasmid', value: 'Plasmid' },
        { id: 'Archaea', value: 'Archaea' },
        { id: 'other', value: 'other' },
      ],
      type: 'dropdown',
      trimDropdown: false,
    },
  ],
}

export const gridMock = {
  columnFeatures: [
    {
      columnHeader: 'Block/Slide/TubeID',
      data: 'tubeId',
      editableCellTemplate: `<div><form name="inputForm"><input class="form-control inputheight" type="INPUT_TYPE" ng-class="'colt' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" ng-paste="grid.appScope.handleCellPaste($event)"></form></div>`,
      headerCellClass: 'required',
      helpText:
        'The identifier on your tube, block or slide.  You can paste in directly from excel, and there are no formatting rules.  Please be as correct as possible, and ensure your tubes, blocks and slides are labeled clearly.',
      name: 'Block/Slide/TubeID',
    },
    {
      columnHeader: 'Sample ID',
      data: 'userId',
      editableCellTemplate: `<div><form name="inputForm"><input class="form-control inputheight" type="INPUT_TYPE" ng-class="'colt' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD" ng-paste="grid.appScope.handleCellPaste($event)"></form></div>`,
      headerCellClass: 'required',
      helpText:
        'The Sample ID stays with your sample for its lifetime. Letters, numbers, dashes, and underscores only, three char min. You cannot have more than one underscore consecutively.',
      name: 'Sample ID',
    },
    {
      columnHeader: 'Species',
      data: 'organism',
      editableCellTemplate: 'ui-grid/dropdownEditor',
      headerCellClass: 'required',
      helpText:
        'If your species is not available, please contact IGO immediately',
      name: 'Species',
      picklistName: 'Species',
      source: [
        'Human',
        'Mouse',
        'Mouse_GeneticallyModified',
        'Drosophilia',
        'Zebrafish',
        'Chicken',
        'Bacteria',
        'S.Cerevisae',
        'Tuberculosis',
        'E.Coli ',
        'C.Elegans',
        'S.Pombe',
        'R.norvegicus',
        'R.rattus',
        'Plasmid',
        'Archaea',
        'other',
      ],
      type: 'dropdown',
      trimDropdown: false,
    },
  ],
  columnHeaders: ['Block/Slide/TubeID', 'Sample ID', 'Species'],
  rows: [
    {
      tubeId: '',
      userId: '',
      organism: 'Tuberculosis',
    },
    {
      tubeId: '',
      userId: '',
      organism: 'Tuberculosis',
    },
  ],
}
