import React from 'react'
import ReactDOM from 'react-dom'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import ReactDataGrid from 'react-data-grid'
import { Editors } from 'react-data-grid-addons'

// no better way of themeing react-data-grid at this time
import './grid.scss'
import 'bootstrap/dist/css/bootstrap.css'

// import { columns } from './sampledata.js'

// import './styles.css'

const { DropDownEditor } = Editors
const issueTypes = [
  { id: 'bug', value: 'Bug' },
  { id: 'epic', value: 'Epic' },
  { id: 'story', value: 'Story' },
]
const IssueTypeEditor = <DropDownEditor options={issueTypes} />

// const rows = [
//   {
//     id: 0,
//     serviceId: 'Task 1',
//     micronicTubeBarcode: 'Bug',
//     knownGeneticAlteration: 20,
//     wellPosition: 20,
//     tooltip:
//       'Fill Plate by Column. It must have at least one letter followed by a number',
//   },
//   {
//     id: 1,
//     serviceId: 'Task 2',
//     micronicTubeBarcode: 'Story',
//     knownGeneticAlteration: 40,
//     wellPosition: 40,
//     tooltip:
//       'Fill Plate by Column. It must have at least one letter followed by a number',
//   },
//   {
//     id: 2,
//     serviceId: 'Task 3',
//     micronicTubeBarcode: 'Epic',
//     knownGeneticAlteration: 60,
//     wellPosition: 60,
//     tooltip:
//       'Fill Plate by Column. It must have at least one letter followed by a number',
//   },
// ]

class Grid extends React.Component {
  state = {
    rows: this.props.grid.rows,
    columns: this.props.grid.columns,
    number_of_rows: this.props.grid.rows.length,
  }
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
    window.dispatchEvent(new Event('resize'))
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevState')
    // console.log(prevState)
    // console.log('state')
    // console.log(this.state)
  }

  render() {
    const { classes, form, handleSubmit } = this.props
    return (
      <ReactDataGrid
        columns={this.props.grid.columns}
        rowGetter={i => this.props.grid.rows[i]}
        rowsCount={this.props.grid.rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
        width="100%"
      />
    )
  }
}

export default Grid
