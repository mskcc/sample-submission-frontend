import React from 'react'
import { withStyles } from '@material-ui/core'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
import swal from '@sweetalert/with-react'

class SubmissionsTable extends React.Component {
  constructor(props) {
    super(props)

    this.hotTableComponent = React.createRef()
  }

  getErrorMsg = () => {
    for (let i = 0; i < numberToAdd; i++) {}
  }
  showError = error => {
    console.log(error)
    swal(error)
  }

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
              let submitted =
                this.props.user.submissionsTable.data[coords.row].submitted ==
                'yes'

              if (coords.col == '4' && !submitted) {
                handleClick(
                  'edit',
                  this.props.user.submissionsTable.data[coords.row]
                    .igo_request_id
                )
                if (coords.col == '5' && submitted) {
                  console.log('receipt download')
                }
              } else if (coords.col == '6' && !submitted) {
                handleClick(
                  'delete',
                  this.props.user.submissionsTable.data[coords.row]
                    .igo_request_id
                )
              }
            }}
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({})

export default withStyles(styles)(SubmissionsTable)
