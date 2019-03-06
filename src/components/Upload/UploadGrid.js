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
// const issueTypes = [
//   { id: 'bug', value: 'Bug' },
//   { id: 'epic', value: 'Epic' },
//   { id: 'story', value: 'Story' },
// ]
// const IssueTypeEditor = <DropDownEditor options={issueTypes} />

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
    rows: [],
    columns: [],
  }

  static getDerivedStateFromProps(props, state) {
    let rowsToUse = state.rows
    let columnsToUse = state.columns
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.grid.rows !== state.rows) {
      rowsToUse = props.grid.rows
    }
    if (props.grid.columns !== state.columns) {
      let columns = props.grid.columns
      for (let i = 0; i < columns.length; i++) {
        if ('editor' in columns[i]) {
          // if ('cancerType' in columns[i]) {
            const dropdownEditor = (
              <DropDownEditor options={columns[i].editDropdownOptionsArray} />
            )

            console.log(columns[i].editDropdownOptionsArray)
            columns[i].editor = dropdownEditor
            columns[i].cellClass = 'dropdown'
          // }
        }
      }
      columnsToUse = columns
      // No state update necessary
    }

    return {
      rows: rowsToUse,
      columns: columnsToUse,
    }
  }

  // onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
  //   this.setState(state => {
  //     const rows = state.rows.slice()
  //     for (let i = fromRow; i <= toRow; i++) {
  //       rows[i] = { ...rows[i], ...updated }
  //     }
  //     console.log(rows)
  //     return { rows }
  //   })
  // }

  // onGridRowsUpdatedRedux = ({ fromRow, toRow, updated }) => {
  //   const rows = this.props.grid.rows.slice()
  //   for (let i = fromRow; i <= toRow; i++) {
  //     rows[i] = { ...rows[i], ...updated }

  //     console.log(rows)
  //     this.props.updateRows(rows)
  //   }
  // }

  // componentWillMount() {
  //   window.dispatchEvent(new Event('resize'))
  // }
  componentDidMount() {
    console.log(this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevState')
    // console.log(prevState)
    // console.log('state')
    // console.log(this.state)
    console.log(this.state)
  }

  render() {
    const { classes, form, handleSubmit } = this.props
    return (
      <div className={classes.container}>
        <ReactDataGrid
          columns={this.props.grid.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.props.grid.rows.length}
          // onGridRowsUpdated={this.onGridRowsUpdatedRedux}
          // onGridRowsUpdated={this.onGridRowsUpdated}
          onGridRowsUpdated={this.props.update}
          enableCellSelect={true}
          minColumnWidth={120}
          // maxHeight={this.props.grid.rows.length * 35 + 50}
          // height = rows.length for small #rows
          minHeight={
            this.props.grid.rows.length < 40
              ? this.props.grid.rows.length * 35 + 50
              : 40 * 35 + 50
          }
        />
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    width: '95vw',
  },
})

export default withStyles(styles)(Grid)
