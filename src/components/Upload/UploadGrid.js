import React from 'react'
import { withStyles } from '@material-ui/core'
import { GridButton } from '../index'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
import swal from '@sweetalert/with-react'

// after comparing agGrid, react-data-grid, canvas-datagrid, react-data-sheet, ReactHandsOnTable won
class UploadGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = { invalidCells: [] } //   // this.handsontableData = this.props.grid.rows
    //   this.handsontableCols = this.props.grid.columns
    //   this.handsontableColFeatures = this.props.grid.columnFeatures
    // }

    this.hotTableComponent = React.createRef()
  }

  getErrorMsg = () => {
    for (let i = 0; i < numberToAdd; i++) {}
  }
  showError = (error, row, prop) => {
    if (error) {
      swal(error)
    }
  }

  handleSave = () => {
    this.props.handleSave()
  }
  handleClear = () => {
    this.hotTableComponent.current.hotInstance.clear()
  }
  handleSubmit = () => {
    const { columnFeatures, rows } = this.props.grid

    // run through grid required columns
    let emptyColumns = new Set()
    for (let i = 0; i < columnFeatures.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (
          columnFeatures[i].optional == false &&
          !rows[j][columnFeatures[i].data]
        ) {
          emptyColumns.add(columnFeatures[i].columnHeader)
        }
      }
    }

    if (emptyColumns.size > 0) {
      swal('Required', [...emptyColumns].join('\n '), 'error')
    } else {
      this.props.handleSubmit()
    }
  }

  render() {
    const {
      classes,
      grid,
      handleChange,
      user,
      handleMRN,
      handleAssay,
      handleIndex,
    } = this.props
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.buttons}>
            <GridButton
              id="grid_submit"
              onClick={this.handleSubmit}
              isLoading={false}
              nothingToSubmit={false}
              color="secondary"
            />
            <GridButton
              id="grid_save"
              onClick={this.handleSave}
              isLoading={user.isSaving}
              done={user.saved}
              msg={'Saved!'}
              color="primary"
            />{' '}
            <GridButton
              id="grid_clear"
              onClick={this.handleClear}
              isLoading={false}
              nothingToSubmit={false}
              color="primary"
            />
          </div>
          <HotTable
            licenseKey="non-commercial-and-evaluation"
            id="hot"
            data={grid.rows}
            colHeaders={grid.columns}
            columns={grid.columnFeatures}
            rowHeaders={true}
            headerTooltips={true}
            manualColumnResize={true}
            comments={true}
            ref={this.hotTableComponent}
            afterChange={(changes, source) => {
              if (changes) {
                if (source !== 'loadData') {
                  handleChange(changes)
                }
                changes.forEach(([row, prop, oldValue, newValue]) => {
                  let rowIndex = row
                  if (prop == 'patientId' && /^([0-9]{8})$/.test(newValue)) {
                    handleMRN(rowIndex)
                    handleChange(changes)
                  }
                  if (prop == 'index' && newValue != oldValue) {
                    let col = this.hotTableComponent.current.hotInstance.propToCol(
                      prop
                    )
                    handleIndex(col, rowIndex, newValue)
                  }
                  if (prop == 'assay') {
                    if (
                      newValue != oldValue &&
                      oldValue != '' &&
                      oldValue != undefined
                    ) {
                      handleAssay(rowIndex, oldValue, newValue)
                      handleChange(changes)
                    }
                  }
                })
              }
            }}
            afterValidate={(isValid, value, row, prop, source) => {
              if (!isValid) {
                let col = this.hotTableComponent.current.hotInstance.propToCol(
                  prop
                )
                this.showError(grid.columnFeatures[col].error, row, prop)
                this.hotTableComponent.current.hotInstance.setDataAtCell(
                  row,
                  col,
                  null
                )
              }
            }}
            width="95%"
            stretchH="all"
            // height="10%"
            height={() => {
              if (grid.rows.length >= 25) return '700'
              // else if (grid.rows.length >= 900) return '100vh'
              else if (grid.rows.length >= 20) return '510'
              else if (grid.rows.length >= 15) return '500'
              else if (grid.rows.length >= 10) return '400'
              else if (grid.rows.length >= 5) return '200'
              else if (grid.rows.length < 5) return '150'
            }}
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    // borderRight: '1px solid gray',
    display: 'grid',
    justifyItems: 'center',
    marginLeft: theme.spacing(2),
    width: '95vw',
    // maxHeight: 600,
    overflow: 'hidden',
  },
  buttons: {},
  tooltipCell: {
    fontSize: '.8em',
    color: 'black !important',
    backgroundColor: '#cfd8dc !important',
  },
  submit: {
    width: '30px',
  },
})

export default withStyles(styles)(UploadGrid)

// Syntax Examples
// colHeaders: [
//   'ID',
//   'Country',
//   'Code',
//   'Currency',
//   'Level',
//   'Units',
//   'Date',
//   'Change'
// ],

// columns: [
//    {
//      data: 'id',
//      type: 'numeric',
//      width: 40
//    },
//    {
//      data: 'flag',
//      renderer: flagRenderer
//    },
//    {
//      data: 'currencyCode',
//      type: 'text'
//    },
//    {
//      data: 'currency',
//      type: 'text'
//    },
//    {
//      data: 'level',
//      type: 'numeric',
//      numericFormat: {
//        pattern: '0.0000'
//      }
//    },
//    {
//      data: 'units',
//      type: 'text'
//    },
//    {
//      data: 'asOf',
//      type: 'date',
//      dateFormat: 'MM/DD/YYYY'
//    },
//    {
//      data: 'onedChng',
//      type: 'numeric',
//      numericFormat: {
//        pattern: '0.00%'
//      }
//    }
//  ],

// dataObject = [
// {
//   id: 1,
//   flag: 'EUR',
//   currencyCode: 'EUR',
//   currency: 'Euro',
//   level: 0.9033,
//   units: 'EUR / USD',
//   asOf: '08/19/2019',
//   onedChng: 0.0026
// },
// {
//   id: 2,
//   flag: 'JPY',
//   currencyCode: 'JPY',
//   currency: 'Japanese Yen',
//   level: 124.3870,
//   units: 'JPY / USD',
//   asOf: '08/19/2019',
//   onedChng: 0.0001
// },
// {
//   id: 3,
//   flag: 'GBP',
//   currencyCode: 'GBP',
//   currency: 'Pound Sterling',
//   level: 0.6396,
//   units: 'GBP / USD',
//   asOf: '08/19/2019',
//   onedChng: 0.00
// }]
