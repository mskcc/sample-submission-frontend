import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { userActions, uploadGridActions } from '../../actions'
import { resetErrorMessage } from '../../actions/commonActions'
import { Redirect } from 'react-router-dom'

import SubmissionsTable from '../../components/Submissions/SubmissionsTable'
import { Dialog } from '../../components/Upload'

export class SubmissionsPage extends Component {
  componentDidMount() {
    this.props.getSubmissions()
  }

  handleClick = (type, id) => {
    switch (type) {
      case 'edit': {
        return this.props.editSubmission(id)
      }
      case 'receipt': {
        return this.props.editSubmission(id)
      }
      case 'delete': {
        return this.props.editSubmission(id)
      }
      default:
        return null
    }
  }

  render() {
    // if (!this.props.loading && !this.props.loggedIn) {
    //   return <Redirect to="/login" />
    // }

    return this.props.user.submissions &&
      this.props.user.submissions.length > 0 ? (
      <SubmissionsTable user={this.props.user} handleClick={this.handleClick} />
    ) : (
      'You have not submitted anything since the launch of V2!'
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
      ...uploadGridActions,

    }
  )(SubmissionsPage)
)
