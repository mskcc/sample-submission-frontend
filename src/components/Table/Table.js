import React from 'react'
import ReactDOM from 'react-dom'
import ReactDataGrid from 'react-data-grid'
import { Editors } from 'react-data-grid-addons'
import axios from 'axios'

import './table.scss'
import { columns } from './sampledata.js'

// import './styles.css'

const { DropDownEditor } = Editors
const issueTypes = [
  { id: 'bug', value: 'Bug' },
  { id: 'epic', value: 'Epic' },
  { id: 'story', value: 'Story' },
]
const IssueTypeEditor = <DropDownEditor options={issueTypes} />

const rows = [
  {
    id: 0,
    serviceId: 'Task 1',
    micronicTubeBarcode: 'Bug',
    knownGeneticAlteration: 20,
    wellPosition: 20,
    tooltip:
      'Fill Plate by Column. It must have at least one letter followed by a number',
  },
  {
    id: 1,
    serviceId: 'Task 2',
    micronicTubeBarcode: 'Story',
    knownGeneticAlteration: 40,
    wellPosition: 40,
    tooltip:
      'Fill Plate by Column. It must have at least one letter followed by a number',
  },
  {
    id: 2,
    serviceId: 'Task 3',
    micronicTubeBarcode: 'Epic',
    knownGeneticAlteration: 60,
    wellPosition: 60,
    tooltip:
      'Fill Plate by Column. It must have at least one letter followed by a number',
  },
]

class Table extends React.Component {
  state = { rows, columns }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice()
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated }
      }
      return { rows }
    })
  }

  componentWillMount() {
    // axios.get('http://localhost:9004/allColumns').then(res => {
    //   var res_columns = res.data.columnDefs.map(column => column)
    //   for (var i = 0; i < res_columns.length; i++) {
    //     columns.push({ key: res_columns[i].field, name: res_columns[i].name })
    //   }
    //   columns = columns.map(column => ({
    //     ...column,
    //     ...defaultColumnProperties,
    //   }))
    //   console.log(columns)
    //   this.setState({ columns: columns })
    // })
    // for (var i = 0; i < columns.length; i++) {
    //    columns.push({ key: res_columns[i].field, name: res_columns[i].name })
    //  }
    //  columns = columns.map(column => ({
    //    ...column,
    //    ...defaultColumnProperties,
    //  }))
    console.log(this.state.columns)

    //   this.setState({ columns: columns })

    window.dispatchEvent(new Event('resize'))
  }

  render() {
    return (
      <ReactDataGrid
        columns={this.state.columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={3}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
        width="100%"
      />
    )
  }
}

export default Table
