import React from 'react'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'

class UploadGridHandsOn extends React.Component {
  constructor(props) {
    super(props)
    this.handsontableData = this.props.grid.rows
    this.handsontableCols = this.props.grid.columns[1]
    this.handsontableColDefs = this.props.grid.columns[0]

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
          columns= {this.handsontableColDefs}
          rowHeaders={true}
          // dropdownMenu= {true}
        />
      </div>
    )
  }
}

export default UploadGridHandsOn
