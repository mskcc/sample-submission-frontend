import React from 'react'
import { withStyles } from '@material-ui/core'
// import { GridButton } from './index'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
import swal from '@sweetalert/with-react'

class cellBtn extends React.Component {
  handleClick = () => {
    this.props.onCellClick(this.props.value)
  }

  render() {
    return <div onClick={this.handleClick}>{this.props.value}</div>
  }
}

// after comparing agGrid, react-data-grid, canvas-datagrid, react-data-sheet, ReactHandsOnTable won
class SubmissionsTable extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { invalidCells: [] } //   // this.handsontableData = this.props.grid.rows
    //   this.handsontableCols = this.props.grid.columns
    //   this.handsontableColFeatures = this.props.grid.columnFeatures
    // }

    this.hotTableComponent = React.createRef()
  }

  getErrorMsg = () => {
    for (let i = 0; i < numberToAdd; i++) {}
  }
  showError = error => {
    console.log(error)

    swal(error)
  }

  handleSubmit = () => {
    const { columnFeatures, rows } = this.props.grid

    // run through grid required columns
    let emptyColumns = new Set()
    // console.log(columnFeatures)
    // console.log(rows)
    for (let i = 0; i < columnFeatures.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (
          columnFeatures[i].optional == false &&
          !rows[j][columnFeatures[i].data]
        ) {
          // console.log(rows[j][columnFeatures[i].data])
          emptyColumns.add(columnFeatures[i].columnHeader)
        }
      }
    }

    if (emptyColumns.size > 0) {
      // console.log(emptyColumns.size)
      swal('Required', [...emptyColumns].join('\n '), 'error')
    } else {
      this.props.handleSubmit()
    }
  }

  // cellBtn = (text, link) => {
  //   <button onClick={() => onClick(text, link)}>{text}</button>
  // }

  // data = submissions => {
  //   let data = []
  //   for (let i = 0; i < submissions.length; i++) {
  //     let submission = submissions[i]

  //     data[i] = {
  //       igo_request_id: submission.igo_request_id,
  //       submitted: submission.submitted ? '<span>&#10003</span>' : '',
  //       created_on: submission.created_on,
  //       submitted_on: submission.submitted_on,
  //       edit: '<a href="/upload/' + submission.igo_request_id + '"> test </a>',
  //       view_receipt: 'view receipt',
  //       delete:
  //         '<div onClick={handleClick()} className={classes.test}>&#10006</a>',
  //     }
  //   }
  //   return data
  // }

  render() {
    const { classes, handleClick, handleReceipt, handleDelete } = this.props
    return (
      <div>
        <div>
          <HotTable
            licenseKey="non-commercial-and-evaluation"
            id="hot"
            ref={this.hotTableComponent}
            data={this.props.user.submissionsTable.data}
            colHeaders={this.props.user.submissionsTable.columnHeaders}
            colHeaders={this.props.user.submissionsTable.columnHeaders}
            readOnly
            className="htCenter"
            columns={this.props.user.submissionsTable.columnFeatures}
            afterOnCellMouseDown={(event, coords, TD) => {
              // console.log(event)
              console.log(coords)
              
              // edit column
              if (coords.col == '4') {
                console.log('edit')
                handleClick('edit',this.props.user.submissionsTable.data[coords.row].igo_request_id)
                // this.handleClick(this.hotTableComponent.current.hotInstance.getCell(coords))
                
              }

              // '2' stands for the RMB
              // this.handleClick(TD.innerHTML)
            }}
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({})

export default withStyles(styles)(SubmissionsTable)
