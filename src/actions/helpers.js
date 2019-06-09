// prep response data for HandsOnTable
// columnHeaders = displayed column names
// features = field/data name, patterns, dropdowns...
// rows = data object, will be modified in place by hands on table

export const generateGridData = (responseColumns, formValues) => {
  let grid = { columnFeatures: [], columnHeaders: [], rows: [] }
  // delete responseColumns['CMO Patient ID']
  grid.columnFeatures = generateColumnFeatures(responseColumns, formValues)
  grid.columnHeaders = grid.columnFeatures.map(
    function(a) {
      // if (a.data != 'assay') {
      return (
        '<span class="' +
        a.className +
        '" title="' +
        a.tooltip +
        '">' +
        a.columnHeader +
        '</span>'
      )
      // }
    }
    // }
    // '    <span class="has-tooltip" href="#">' +
    // a.columnHeader +
    // '<span class="tooltip-wrapper"><span class="tooltip">' +
    // a.tooltip +
    // '</span></span></span>'
  )

  grid.rows = generateRows(
    grid.columnFeatures,
    formValues,
    formValues.number_of_samples
  )
  return grid
}

function extractValues(mappings) {
  let result = mappings.map(a => a.value)
  return result
}

function generateColumnFeatures(responseColumns, formValues) {
  let columnFeatures = []

  for (let i = 0; i < responseColumns.length; i++) {
    // if (responseColumns[i].data == 'assay') {
    //   continue
    // }
    columnFeatures[i] = responseColumns[i]

    //  patient_id_type is only set if corresponding species was selected

    if (
      columnFeatures[i].data == 'patientId' &&
      (formValues.species == 'Mouse' ||
        formValues.species == 'Mouse_GeneticallyModified')
    ) {
      columnFeatures[i] = {
        ...columnFeatures[i],
        columnHeader: 'Strain or Line Name',
      }
    }

    if (
      columnFeatures[i].data == 'patientId' &&
      formValues.patient_id_type !== ''
    ) {
      let formattingAdjustments = choosePatientIDFormatter(
        formValues.patient_id_type
      )
      columnFeatures[i] = { ...columnFeatures[i], ...formattingAdjustments }
    }
    // dropdown in column?
    if ('source' in responseColumns[i]) {
      // TODO map backwards on submit or find way to keep tumorType id
      columnFeatures[i].source = extractValues(responseColumns[i].source)
      columnFeatures[i].trimDropdown = false
      //  assay dropdown needs invalids to allow for concatenation of selects
      if (responseColumns[i].data == 'assay') {
        columnFeatures[i].allowInvalid = true
      } else {
        columnFeatures[i].allowInvalid = false
      }
    }
    if ('optional' in responseColumns[i]) {
      // print(responseColumns)

      columnFeatures[i].allowEmpty = responseColumns[i].optional
      columnFeatures[i].className = responseColumns[i].optional
        ? 'optional'
        : 'required'
      if (columnFeatures[i].optional) {
      }
    }
  }

  return columnFeatures
}

function choosePatientIDFormatter(patientIDType) {
  switch (patientIDType) {
    case 'MSK-Patients (or derived from MSK Patients)':
      return {
        pattern: 'd{8}',
        columnHeader: 'MRN',
        error:
          'MRN is incorrectly formatted, please correct, or speak to a project manager if unsure.',

        type: 'text',
        validator: function(value, callback) {
          if (/\d{8}/.test(value) || value == '') {
            callback(true)
          } else {
            callback(false)
          }
        },
      }
    case 'Non-MSK Patients':
      return {
        pattern: '[0-9a-zA-Z]{4,}',
        columnHeader: 'Patient ID',
        error: 'Invalid format. Please use only alpha-numeric values.',

        validator: function(value, callback) {
          if (/[0-9a-zA-Z]{4,}/.test(value) || value == '') {
            callback(true)
          } else {
            callback(false)
          }
        },
      }
    case 'Cell Lines, not from Patients':
      return { columnHeader: 'Cell Line Name' }
    case 'Both MSK-Patients and Non-MSK Patients':
      return {
        pattern: '[0-9a-zA-Z]{4,}|d{8}',
        columnHeader: 'Patient ID',
        error: 'Invalid format. Please use only alpha-numeric values.',

        validator: function(value, callback) {
          if (/[0-9a-zA-Z]{4,}|d{8}/.test(value) || value == '') {
            callback(true)
          } else {
            callback(false)
          }
        },
      }
    default:
      return { pattern: 'formatter not found' }
  }
}

function generateRows(columns, formValues, numberToAdd) {
  let rows = []
  for (let i = 0; i < numberToAdd; i++) {
    for (let j = 0; j < columns.length; j++) {
      // first row is helptexts and readonly
      // if (!update && i === 0) {
      //   rows[i] = {
      //     ...rows[i],
      //     [columns[j].data]: columns[j].tooltip,
      //     // readOnly: true,
      //   }
      // } else {
      if (columns[j].data == 'species' || columns[j].data == 'organism') {
        rows[i] = { ...rows[i], [columns[j].data]: formValues.species }
      } else {
        rows[i] = { ...rows[i], [columns[j].data]: '' }
      }
      // }
    }
  }
  return rows
}

// helper to compare header.formState and grid.formValues to see which columns need to be updated
// returns obj2 where it differs from obj1
// returns undefined if they are the same
export const diff = (obj1, obj2) => {
  const result = {}
  if (Object.is(obj1, obj2)) {
    return undefined
  }
  if (!obj2 || typeof obj2 !== 'object') {
    return obj2
  }
  Object.keys(obj1 || {})
    .concat(Object.keys(obj2 || {}))
    .forEach(key => {
      if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
        result[key] = obj2[key]
      }
      if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
        const value = diff(obj1[key], obj2[key])
        if (value !== undefined) {
          result[key] = value
        }
      }
    })
  return result
}

// update rows on #samples change without losing data
export const updateRows = (formValues, grid) => {
  let newNumOfSamples = formValues.number_of_samples
  let oldNumOfSamples = grid.form.number_of_samples
  let rows = []
  let numOfRowsToGen = newNumOfSamples - oldNumOfSamples
  let newRows
  if (numOfRowsToGen > 0) {
    rows = grid.rows
    newRows = generateRows(grid.columnFeatures, formValues, numOfRowsToGen)
    rows = rows.concat(newRows)
  } else {
    for (let i = 0; i < newNumOfSamples; i++) {
      rows[i] = grid.rows[i]
    }
  }
  return rows
}

export const generateSubmitData = state => {
  let data = {}
  data.version = state.common.version
  data.grid_values = state.upload.grid.rows
  data.form_values = state.upload.grid.form

  let now = Date.now()
  let date = Math.floor(now / 1000)
  // TODO use this for save/edit
  data.transaction_id = date

  console.log(data)
  return data
}

// edit: links back to /upload, onClick the grid_valyes of that row is fed into
// the state (see SubmissionsTable for the onClick)
export const generateSubmissionsGrid = response => {
  let grid = { columnHeaders: [], data: [], columnFeatures: [] }

  grid.columnHeaders = response.submission_columns.map(a => a.name)
  grid.columnFeatures = response.submission_columns
  for (let i = 0; i < response.submissions.length; i++) {
    let submission = response.submissions[i]
    grid.data[i] = {
      igo_request_id: submission.igo_request_id,
      transaction_id: submission.transaction_id,
      username: submission.username,
      sample_type: JSON.parse(submission.form_values).material,
      application: JSON.parse(submission.form_values).application,
      version: submission.version,
      submitted: submission.submitted ? 'yes' : 'no',
      created_on: submission.created_on,
      submitted_on: submission.submitted_on,
      edit: submission.submitted
        ? '<span class="grid-action-disabled">edit</span>'
        : '<span class="grid-action">edit</span>',
      receipt: submission.submitted
        ? '<span class="grid-action grid-action">download</span>'
        : '<span class="grid-action-disabled">download</span>',
      delete: submission.submitted
        ? '<span class="grid-action-disabled">delete</span>'
        : '<span class="grid-action">delete</span>',
    }
  }
  return grid
}

export const findSubmission = (submissions, id) => {
  for (let i = 0; i < submissions.length; i++) {
    if (submissions[i].igo_request_id == id) {
      return submissions[i]
    }
  }
  return null
}

export const redactMRN = (rows, index, id) => {
  rows[index].cmoPatientId = id
  rows[index].patientId = "MRN REDACTED"
  return rows
}

export const appendAssay = (rows, index, oldValue, newValue) => {
  // console.log(rows)
  // console.log(index)
  // console.log(oldValue, newValue)
  rows[index].assay = newValue + ',' + oldValue
  // console.log(rows)
  return rows
}
