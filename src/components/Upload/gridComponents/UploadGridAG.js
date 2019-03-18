import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

class UploadGridAG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columnDefs: this.props.grid.columns,
      rowData: this.props.grid.rows,
    }
  }

  render() {
    console.log(this.props)

    return (
      <div className="ag-theme-balham">
        <AgGridReact
          defaultColDef={{
            sortable: true,
            editable: true,

            headerComponentParams: {
              menuIcon: 'fa-bars',
            },
          }}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
      </div>
    )
  }
}

export default UploadGridAG
