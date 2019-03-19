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

function extractValues(mappings) {
  let result = mappings.map(a => a.value)

  // console.log(result)

  return result
}

export const updateRows = (newNumberOfSamples, oldNumberOfSamples, grid) => {
  console.log(newNumberOfSamples)
  console.log(oldNumberOfSamples)
  console.log(grid)
  let row = new Array(grid.columns.length)

  if (oldNumberOfSamples < newNumberOfSamples) {
    let newRows = newNumberOfSamples - oldNumberOfSamples
    // simply append empty rows for the difference
    for (let i = 0; i < newRows; i++) {
      grid.rows.push(row)
      console.log('bigger')
    }
  } else {
    grid.rows = []
    for (let i = 0; i < newNumberOfSamples; i++) {
      grid.rows.push(row)
      console.log('smaller')
    }
  }
  return grid
}
// prep columns for HandsOnTable
export const generateHotData = (columnDefs, formValues) => {
  let grid = { columnFeatures: [], columnNames: [], rows: [] }
  let columns = [{}]
  let row = new Array(columnDefs.length)
  let data = [[]]
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
  grid.columnFeatures = columns
  grid.columnNames = columnDefs.map(a => a.key)

  data[0] = columns
  data[1] = columnDefs.map(a => a.key)

  // append empty row for however many samples are to be submitted
  for (let i = 0; i < formValues.number_of_samples; i++) {
    data[i + 2] = row
    grid.rows.push(row)
  }

  console.log(data)
  console.log(grid)
  return grid
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
