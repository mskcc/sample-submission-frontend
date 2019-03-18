import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

class UploadGridAG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columnDefs: [
        {
          headerName: 'Make',
          field: 'make',
        },
        {
          headerName: 'Model',
          field: 'model',
        },
        {
          headerName: 'Price',
          field: 'price',
        },
      ],
      rowData: [
        {
          make: 'Toyota',
          model: 'Celica',
          price: 35000,
        },
        {
          make: 'Ford',
          model: 'Mondeo',
          price: 32000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
      ],
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
          columnDefs={this.props.grid.columns}
          rowData={this.props.grid.rows}
        />
      </div>
    )
  }
}

export default UploadGridAG
