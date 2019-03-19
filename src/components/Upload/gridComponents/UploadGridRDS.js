import React, { Component } from 'react'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class UploadGridRDS extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: [
        [{value:  1}, {value:  3}],
        [{value:  2}, {value:  4}]
      ]
    }
  }
  render () {
    console.log(this.props.grid.rows)
    return (
      <ReactDataSheet
        data={this.props.grid.rows}
        valueRenderer={(cell) => cell.value}
        onCellsChanged={changes => {
          const grid = this.props.grid.rows.map(row => [...row])
          changes.forEach(({cell, row, col, value}) => {
            grid[row][col] = {...grid[row][col], value}
          })
          this.setState({grid})
        }}
      />
    )
  }
}


export default UploadGridRDS
