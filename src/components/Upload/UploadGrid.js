import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'

// after comparing agGrid, react-data-grid, canvas-datagrid, react-data-sheet, ReactHandsOnTable won
class UploadGrid extends React.Component {
  constructor(props) {
    super(props)
    // this.handsontableData = this.props.grid.rows
    this.handsontableCols = this.props.grid.columns
    this.handsontableColFeatures = this.props.grid.columnFeatures
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <HotTable
          licenseKey="non-commercial-and-evaluation"
          id="hot"
          data={this.props.grid.rows}
          colHeaders={this.props.grid.columns}
          columns={this.props.grid.columnFeatures}
          rowHeaders={true}
          manualColumnResize={true}
          width="95vw"
          height="80vh"
        />
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    borderRight: '1px solid gray',
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
