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
            readOnly
            className="htCenter"
            columns={this.props.user.submissionsTable.columnFeatures}
            stretchH="all"
            filters="true"
            columnSorting="true"
            dropdownMenu={['filter_by_value', 'filter_action_bar']}
            afterOnCellMouseDown={(event, coords, TD) => {
              if (coords.row != -1) {
                let id = this.props.user.submissionsTable.data[coords.row]
                  .service_id
                let submitted =
                  this.props.user.submissionsTable.data[coords.row].submitted ==
                  'yes'

                let username = this.props.user.submissionsTable.data[coords.row]
                  .username
                if (coords.col == '9' && !submitted) {
                  handleClick('edit', id, username)
                } else if (coords.col == '10' && submitted) {
                  handleClick('receipt', id, username)
                } else if (coords.col == '11' && !submitted) {
                  handleClick('delete', id, username)
                }
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
