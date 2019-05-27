import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { uploadGridActions } from '../../actions'
import { resetErrorMessage } from '../../actions/commonActions'
import { Redirect } from 'react-router-dom'

import SubmissionsTable from '../../components/Submissions/SubmissionsTable'
import { Dialog } from '../../components/Upload'

export class SubmissionsPage extends Component {
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
    // if (!this.props.loading && !this.props.loggedIn) {
    //   return <Redirect to="/login" />
    // }

    return (
      <React.Fragment>
        <SubmissionsTable user={this.props.user} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default withLocalize(
  connect(
    mapStateToProps,
    {
      resetErrorMessage,
      ...uploadGridActions,
    }
  )(SubmissionsPage)
)
