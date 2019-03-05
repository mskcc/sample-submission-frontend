import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { uploadGridActions } from '../../actions'
import { resetErrorMessage } from '../../actions/commonActions'

import { Table } from '../../components'
import { Dialog } from '../../components/Upload'
import UploadFormContainer from './UploadFormContainer'
import UploadGridContainer from './UploadGridContainer'

class UploadPage extends Component {
  handleFormSubmit = formValues => {
    // this.props.resetErrorMessage()

    // TODO When do people update sample number?
    this.props.getColumns(formValues)
  }
  //  handleGridSubmit = formValues => {
  //   // this.props.resetErrorMessage()

  // }

  handleDialogClose = () => {
    this.props.resetGridErrorMessage()
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.grid.error.length > 0}
          handleClose={this.handleDialogClose}
          msg={this.props.grid.error}
        />
        <UploadFormContainer handleSubmit={this.handleFormSubmit} />
          <UploadGridContainer handleSubmit={this.handleGridSubmit} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  grid: state.upload.grid,
})

export default withLocalize(
  connect(
    mapStateToProps,
    {
      resetErrorMessage,
      ...uploadGridActions,
    }
  )(UploadPage)
)
