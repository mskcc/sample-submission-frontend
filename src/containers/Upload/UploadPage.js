import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { uploadGridActions, userActions } from '../../actions'
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

  componentDidMount() {
    this.props.refreshToken()
  }

  render() {
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
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
})

export default withLocalize(
  connect(
    mapStateToProps,
    {
      // resetErrorMessage,
      ...uploadGridActions,
      ...userActions,
    }
  )(UploadPage)
)
