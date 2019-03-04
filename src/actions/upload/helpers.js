export const generateRows = (formValues, columns) => {
  //  number of rows * columns
  //  fill each row with column contents
  let rows = []
  for (let i = 0; i < formValues.number_of_samples; i++) {
    for (let j = 0; j < columns.length; j++) {
      if (columns[j].key == 'species'||columns[j].key == 'organism') {
        rows[i] = { ...rows[i], [columns[j].key]: formValues.species }
      } else {
        rows[i] = { ...rows[i], [columns[j].key]: '' }
      }
    }
  }
  return rows
}
