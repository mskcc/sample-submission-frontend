import React from 'react'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'

// after comparing agGrid, react-data-grid, canvas-datagrid, react-data-sheet, ReactHandsOnTable won
class UploadGrid extends React.Component {
  constructor(props) {
    super(props)
    this.handsontableData = this.props.grid.rows
    this.handsontableCols = this.props.grid.columns
    this.handsontableColFeatures = this.props.grid.columnFeatures
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <HotTable
          licenseKey="non-commercial-and-evaluation"
          id="hot"
          data={this.handsontableData}
          colHeaders={this.handsontableCols}
          columns={this.handsontableColFeatures}
          rowHeaders={true}
          // dropdownMenu= {true}
        />
      </div>
    )
  }
}

export default UploadGrid
