import React from 'react'
import { withStyles } from '@material-ui/core'
// import { GridButton } from './index'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
import swal from '@sweetalert/with-react'

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

  render() {
    const { classes } = this.props
    console.log(this.props)
    // console.log(this.props.submissions.length)
    return (
      <div>
        <div className={classes.container}>
        
          <div className={classes.buttons} />
          <HotTable
            licenseKey="non-commercial-and-evaluation"
            id="hot"
            data={this.props.user.submissions}
            colHeaders={this.props.user.submissions}
            // columns={this.props.grid.columnFeatures}
            // rowHeaders={true}
            // headerTooltips={true}
            // manualColumnResize={true}
            // comments={true}
            // ref={this.hotTableComponent}
            // colWidths="190"
            // cells={function(row, col, prop) {
            //   // first row contains helptext
            //   var cellProperties = {}
            //   if (row === 0) {
            //     cellProperties.readOnly = true
            //     cellProperties.className = classes.tooltipCell
            //     cellProperties.type = 'text'
            //   }
            //   return cellProperties
            // }}
            // afterChange={(change, source) => {
            //   if (source !== 'loadData') {
            //     this.props.handleChange(change)
            //   }
            // }}

            width="95%"
            stretchH="all"
            // height="10%"
            // height={() => {
            //   if (this.props.submissions.length >= 25) return '700'
            //   // else if (this.props.submissions.length >= 900) return '100vh'
            //   else if (this.props.submissions.length >= 20) return '510'
            //   else if (this.props.submissions.length >= 15) return '500'
            //   else if (this.props.submissions.length >= 10) return '400'
            //   else if (this.props.submissions.length >= 5) return '200'
            //   else if (this.props.submissions.length < 5) return '150'
            // }}
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
    marginLeft: theme.spacing.unit * 2,
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

export default withStyles(styles)(SubmissionsTable)
