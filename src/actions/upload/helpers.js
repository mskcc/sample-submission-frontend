export const generateRows = (formValues, columns) => {
  //  number of rows * columns
  //  fill each row with column contents
  let rows = []
  for (let i = 0; i < formValues.number_of_samples; i++) {
    for (let j = 0; j < columns.length; j++) {
      if (columns[j].key == 'species' || columns[j].key == 'organism') {
        rows[i] = { ...rows[i], [columns[j].key]: formValues.species }
      } else {
        rows[i] = { ...rows[i], [columns[j].key]: '' }
      }
    }
  }
  return rows
}

// prep columns for agGrid
export const generateAGColumns = columnDefs => {
  let columns = []
  // console.log(columnDefs[9].editDropdownOptionsArray)
  // console.log(extractValues(columnDefs[9].editDropdownOptionsArray))
  // console.log(columnDefs[9].editDropdownOptionsArray)
  for (let i = 0; i < columnDefs.length; i++) {
    columns[i] = columnDefs[i]
    if ('editable' in columns[i]) {
      delete columns[i].editable
    }
    if ('editor' in columns[i]) {
      // if ('cancerType' in columns[i]) {
      columns[i].cellEditor = 'agSelectCellEditor'
      columns[i].cellEditorParams = {
        values: extractValues(columns[i].editDropdownOptionsArray),
      }
      delete columns[i].editDropdownOptionsArray
      columns[i].field = columns[i].key
      columns[i].headerName = columns[i].displayName
      delete columns[i].displayName
    }
  }
  return columns
}

function extractValues(mappings) {
  let result = mappings.map(a => a.value)

  // console.log(result)

  return result
}

// prep columns for HandsOnTable
export const generateHotData = (columnDefs, formValues) => {
  let columns = [{}]
  // console.log(columnDefs[9].editDropdownOptionsArray)
  // console.log(extractValues(columnDefs[9].editDropdownOptionsArray))
  // console.log(columnDefs[9].editDropdownOptionsArray)
  let rows = new Array(columnDefs.length)
  let data = [[]]

  // for (let i = 0; i < formValues.number_of_samples; i++) {

  //     if (columns[j].key == 'species' || columns[j].key == 'organism') {
  //       rows[i] = { ...rows[i], [columns[j].key]: formValues.species }
  //     } else {
  //       rows[i] = { ...rows[i], [columns[j].key]: '' }
  //     }
  //   }
  // }
  //  first element in data is array of column names
  for (let i = 0; i < columnDefs.length; i++) {
    columns[i] = {}
    if ('editor' in columnDefs[i]) {
      // if ('cancerType' in columns[i]) {
      columns[i].editor = 'select'
      columns[i].selectOptions = extractValues(
        columnDefs[i].editDropdownOptionsArray
      )
    }
  }
  data[0] = columns
  data[1] = columnDefs.map(a => a.key)

  // append empty rows for however many samples are to be submitted
  for (let i = 0; i < formValues.number_of_samples; i++) {
    data[i + 2] = rows
  }

  console.log(data)
  return data
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
