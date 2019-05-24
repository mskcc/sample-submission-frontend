import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { uploadGridActions } from '../../actions'
import { resetErrorMessage } from '../../actions/commonActions'
import { Redirect } from 'react-router-dom'

import { Dialog } from '../../components/Upload'
import UploadFormContainer from './UploadFormContainer'
import UploadGridContainer from './UploadGridContainer'

export class UploadPage extends Component {
  handleFormSubmit = formValues => {
    // TODO When do people update sample number?
    this.props.getColumns(formValues)
  }
  handleGridSubmit = formValues => {
    // this.props.resetErrorMessage()
  }

  handleDialogClose = () => {
    this.props.resetGridErrorMessage()
  }

  render() {
    console.log(this.props.loggedIn)
    if (!this.props.loading && !this.props.loggedIn) {
      return <Redirect to="/login" />
    }
    return (
      <React.Fragment>
        <Dialog
          open={this.props.grid.error.length > 0}
          handleClose={this.handleDialogClose}
          msg={this.props.grid.error}
        />
        <UploadFormContainer
          handleSubmit={this.handleFormSubmit}
          gridIsLoading={this.props.grid.gridIsLoading}
          nothingToChange={this.props.grid.nothingToChange}
        />
        <UploadGridContainer handleSubmit={this.handleGridSubmit} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  grid: state.upload.grid,
  loggedIn: state.common.loggedIn,
  loading: state.common.loading,

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
