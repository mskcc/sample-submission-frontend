import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { userActions } from '../../actions'
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

  componentDidMount() {
    // making sure BE and FE versions match - shows info message if not
    this.props.getSubmissions()
  }

  handleDialogClose = () => {
    this.props.resetGridErrorMessage()
  }

  render() {
    if (!this.props.loading && !this.props.loggedIn) {
      return <Redirect to="/login" />
    }

    return (
      <React.Fragment>
        <SubmissionsTable submissions={this.props.user.submissionsTable} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
})

export default withLocalize(
  connect(
    mapStateToProps,
    {
      resetErrorMessage,
      ...userActions,
    }
  )(SubmissionsPage)
)
