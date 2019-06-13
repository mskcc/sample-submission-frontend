// prep response data for HandsOnTable
// columnHeaders = displayed column names
// features = field/data name, patterns, dropdowns...
// rows = data object, will be modified in place by hands on table

export const generateGridData = (responseColumns, formValues) => {
  let grid = { columnFeatures: [], columnHeaders: [], rows: [] }
  grid.columnFeatures = generateColumnFeatures(responseColumns, formValues)
  grid.columnHeaders = grid.columnFeatures.map(
    a =>
      '<span class="' +
      a.className +
      '" title="' +
      a.tooltip +
      '">' +
      a.columnHeader +
      '</span>'
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

    if (columnFeatures[i].data == 'index') {
      columnFeatures[i].barcodeHash = JSON.parse(columnFeatures[i].barcodeHash)
    }

    //  overwrite response container with user selection
    if ('container' in columnFeatures[i]) {
      if (columnFeatures[i].container != formValues.container)
        columnFeatures[i] = overwriteContainer(formValues.container)
    }

    if (columnFeatures[i].data == 'patientId') {
      let formattingAdjustments = choosePatientIDFormatter(
        formValues.patient_id_type,
        formValues.species,
        formValues.grouping_checked
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
        columnFeatures[i].allowEmpty = true
        columnFeatures[i].error = 'Something went wrong'
      } else {
      }
    }
    // had to be hard coded, everything else caused laggy validation
    if ('pattern' in columnFeatures[i]) {
      switch (columnFeatures[i].pattern) {
        case 'userId':
          columnFeatures[i].validator = (value, callback) => {
            if (
              value == '' ||
              value == null ||
              /^[A-Za-z0-9](?!.*__)[A-Za-z0-9\\,_-]{2}[A-Za-z0-9\\,_-]*$/.test(
                value
              )
            ) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break

        case 'patientId':
          if (!'validator' in columnFeatures[i]) {
            columnFeatures[i].validator = (value, callback) => {
              if (
                value == '' ||
                value == null ||
                /^[A-Za-z0-9][A-Za-z0-9\\,_-]*$/.test(value)
              ) {
                callback(true)
              } else {
                callback(false)
              }
            }
          }
          break

        case 'number':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /^[0-9.]*$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break

        case 'collectionYear':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /\d{4}|^$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'wellPosition':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /[A-Za-z]+\d+|^$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'micronicTubeBarcode':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /^[0-9]{10}$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'alphanum':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /[0-9a-zA-Z]/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'alphanumdash':
          columnFeatures[i].validator = (value, callback) => {
            if (
              value == '' ||
              value == null ||
              /[A-Za-z0-9\\,_-]/.test(value)
            ) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
      }

      columnFeatures[i].error = columnFeatures[i].error
        ? columnFeatures[i].error
        : 'Invalid format.'
    }
    if ('optional' in responseColumns[i]) {
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

function choosePatientIDFormatter(patientIDType, species, groupingChecked) {
  if (species == 'Mouse' || species == 'Mouse_GeneticallyModified') {
    if (groupingChecked) {
      return {
        pattern: '[0-9a-zA-Z]{4,}',
        columnHeader: 'Grouping ID',
        error:
          'Invalid format. Please use at least four alpha-numeric characters.',

        validator: function(value, callback) {
          if (
            /[0-9a-zA-Z]{4,}/.test(value) ||
            value == '' ||
            value == undefined
          ) {
            callback(true)
          } else {
            callback(false)
          }
        },
      }
    } else {
      return {
        pattern: '[0-9a-zA-Z]{4,}',
        columnHeader: 'Strain or Line Name',
        error:
          'Invalid format. Please use at least four alpha-numeric characters.',

        validator: function(value, callback) {
          if (
            /[0-9a-zA-Z]{4,}/.test(value) ||
            value == '' ||
            value == undefined
          ) {
            callback(true)
          } else {
            callback(false)
          }
        },
      }
    }
  } else {
    switch (patientIDType) {
      case 'MSK-Patients (or derived from MSK Patients)':
        return {
          pattern: 'd{8}',
          columnHeader: 'MRN',
          tooltip:
            'For non-MSKCC patient samples, mouse samples, or cell lines without patient origin, please use this field to provide us with group names i.e. compare this group (A) with this group (B). For CMO projects, fill out something unique and correspond with your PM for more information.',
          error:
            'MRN is incorrectly formatted, please correct, or speak to a project manager if unsure.',

          type: 'text',
          validator: function(value, callback) {
            if (/\d{8}/.test(value) || value == '' || value == undefined) {
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
          error:
            'Invalid format. Please use at least four alpha-numeric characters.',

          validator: function(value, callback) {
            if (
              /[0-9a-zA-Z]{4,}/.test(value) ||
              value == '' ||
              value == undefined
            ) {
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
          error:
            'Invalid format. Please use at least four alpha-numeric characters.',

          validator: function(value, callback) {
            if (
              /[0-9a-zA-Z]{4,}|d{8}/.test(value) ||
              value == '' ||
              value == undefined
            ) {
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
      //
      if (columns[j].data == 'species' || columns[j].data == 'organism') {
        rows[i] = { ...rows[i], [columns[j].data]: formValues.species }
        // } else if (columns[j].data == 'wellPosition') {
        //   rows[i] = { ...rows[i], [columns[j].data]: getWellPos(i) }
      } else {
        rows[i] = { ...rows[i], [columns[j].data]: '' }
      }
      // }
    }
  }
  for (let j = 0; j < columns.length; j++) {
    if (columns[j].data == 'wellPosition') {
      return setWellPos(rows)
      // break
    }
  }

  return rows
}

// pre-filling WellPosition for a plate of 96 wells
// times = how many times bigger is the #samples than the plate rows (8 A-H) -
// how many columns will have to be filled, used as end condition
// i = counter indicating how often I stepped through A-H
// plateColIndex = plate column
//

export const setWellPos = rows => {
  let plateRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let plateColsLength = 12
  let times = Math.ceil(rows.length / plateRows.length)
  let i = 0
  let plateColIndex = 0

  //  step through as many times as you have to, and while you still have empty columns
  while (i < times && plateColIndex < plateColsLength) {
    // fill rows first
    for (let j = 0; j < plateRows.length; j++) {
      if (rows[j + plateRows.length * i]) {
        // fill row at position plateRows * number of times you did this already
        rows[j + plateRows.length * i].wellPosition = plateRows[j] + (i + 1)
      } else {
        break
      }
    }
    plateColIndex++
    i++
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
      service_id: submission.service_id,
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
    if (submissions[i].service_id == id) {
      return submissions[i]
    }
  }
  return null
}

export const redactMRN = (rows, index, id, msg, sex) => {
  rows[index].cmoPatientId = 'C-' + id
  rows[index].patientId = msg
  if (sex != '') {
    rows[index].gender = sex == 'Female' ? 'F' : 'M'
  }
  return rows
}

//  barcode hash is saved in colFeatures.index when index is part of the getCols response
export const findIndexSeq = (grid, colIndex, rowIndex, indexId) => {
  let result = { success: false, rows: '' }
  let barcodes = grid.columnFeatures[colIndex].barcodeHash
  if (indexId == '') {
    grid.rows[rowIndex].indexSequence = ''
    return { success: true, rows: grid.rows }
  }
  if (indexId in barcodes) {
    let indexSeq = barcodes[indexId].barcodeTag

    grid.rows[rowIndex].indexSequence = indexSeq
    return { success: true, rows: grid.rows }
  }

  return result
}

export const appendAssay = (rows, index, oldValue, newValue) => {
  //  clear
  if (newValue == '' || newValue == 'Assay Selection' || newValue == 'Blank') {
    rows[index].assay = ''
    //  delete
  } else if (newValue.length < oldValue.length) {
    rows[index].assay = newValue.replace(/(^,)|(,$)/g, '')
  }
  //  append
  else {
    rows[index].assay = newValue + ',' + oldValue
  }
  return rows
}

// overwrites everything including data to properly feed back to BankedSample
const overwriteContainer = userContainer => {
  switch (userContainer) {
    case 'Plates':
      return {
        name: 'Plate ID',
        columnHeader: 'Plate ID',
        data: 'plateId',
        container: 'Plates',
        pattern: 'alphanumdash',
        tooltip:
          'The plate ID is the barcode on your plate.  Please scan, or carefully type, the barcode ID into this field for all samples on the plate',
      }
      break

    case 'Micronic Barcoded Tubes':
      return {
        name: 'Micronic Tube Barcode',
        container: 'Micronic Barcoded Tubes',
        columnHeader: 'Micronic Tube Barcode',
        data: 'micronicTubeBarcode',
        pattern: 'micronicTubeBarcode',
        error: 'The Micronic Tube ID is a ten-digit number.',
        tooltip:
          'The Micronic Tube Barcode has been provided to you in advance by the sample receiving team.  If you cannot find it, the Micronic Tube Barcode is located on the side of the tube, and the 2D barcode can be scanned by a reader',
      }
      break

    case 'Blocks/Slides/Tubes':
      return {
        name: 'Block/Slide/TubeID',
        container: 'Blocks/Slides/Tubes',
        columnHeader: 'Block/Slide/TubeID',
        data: 'tubeId',
        pattern: 'alphanumdash',
        tooltip:
          'The identifier on your tube, block or slide.  You can paste in directly from excel, and there are no formatting rules.  Please be as correct as possible, and ensure your tubes, blocks and slides are labeled clearly.',
      }
    default:
      break
  }
}

export const createValidators = grid => {
  let columnFeatures = grid.columnFeatures
  let formValues = grid.form
  for (let i = 0; i < columnFeatures.length; i++) {
    if ('pattern' in columnFeatures[i] && !('validator' in columnFeatures[i])) {
      switch (columnFeatures[i].pattern) {
        case 'userId':
          columnFeatures[i].validator = (value, callback) => {
            if (
              value == '' ||
              value == null ||
              /^[A-Za-z0-9](?!.*__)[A-Za-z0-9\\,_-]{2}[A-Za-z0-9\\,_-]*$/.test(
                value
              )
            ) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break

        case 'patientId':
          columnFeatures[i].validator = (value, callback) => {
            if (
              value == '' ||
              value == null ||
              /^[A-Za-z0-9][A-Za-z0-9\\,_-]*$/.test(value)
            ) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break

        case 'number':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /^[0-9.]*$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break

        case 'collectionYear':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /\d{4}|^$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'wellPosition':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /[A-Za-z]+\d+|^$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'micronicTubeBarcode':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /^[0-9]{10}$/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'alphanum':
          columnFeatures[i].validator = (value, callback) => {
            if (value == '' || value == null || /[0-9a-zA-Z]/.test(value)) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
        case 'alphanumdash':
          columnFeatures[i].validator = (value, callback) => {
            if (
              value == '' ||
              value == null ||
              /[A-Za-z0-9\\,_-]/.test(value)
            ) {
              callback(true)
            } else {
              callback(false)
            }
          }
          break
      }
      if (columnFeatures[i].data == 'patientId') {
        let formattingAdjustments = choosePatientIDFormatter(
          formValues.patient_id_type,
          formValues.species,
          formValues.grouping_checked
        )
        columnFeatures[i] = { ...columnFeatures[i], ...formattingAdjustments }
      }
    }
  }
  return columnFeatures
}

export const validateGrid = (changes, grid) => {
  let errors = new Set([])
  // let errors = new Set([])
  for (let i = 0; i < changes.length; i++) {
    let newValue = changes[i][3]
    let rowIndex = changes[i][0]
    let columnName = changes[i][1]

    let columnIndex = grid.columnFeatures.findIndex(c => c.data == columnName)
    if ('validator' in grid.columnFeatures[columnIndex]) {
      grid.columnFeatures[columnIndex].validator(newValue, function(valid) {
        if (!valid) {
          errors.add(
            'Invalid data in ' +
              grid.columnFeatures[columnIndex].name +
              '. ' +
              grid.columnFeatures[columnIndex].error +
              '\n'
          )
          grid.rows[rowIndex][columnName] = ''
        }
      })
    }
    if ('source' in grid.columnFeatures[columnIndex]) {
      if (!grid.columnFeatures[columnIndex].source.includes(newValue)) {
        errors.add(
          'Invalid data in ' +
            grid.columnFeatures[columnIndex].name +
            '. ' +
            grid.columnFeatures[columnIndex].error +
            '\n'
        )
        grid.rows[rowIndex][columnName] = ''
      }
    }
  }
  console.log(errors)
  buildErrorMessage(errors)
  // console.log(buildErrorMessage(errors))

  return { grid, errors: buildErrorMessage(errors) }
}

export const buildErrorMessage = errors => {
  let message = ''
  errors.forEach(a => (message = message.concat(a)))
  return message
}
