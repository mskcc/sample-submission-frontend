import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { resetErrorMessage } from '../../actions/commonActions'

import { Table } from '../../components'
import UploadFormContainer from './UploadFormContainer'

class UploadPage extends Component {
  render() {
    return (
      <React.Fragment>
        <UploadFormContainer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
})

export default withLocalize(
  connect(
    mapStateToProps,
    {
      resetErrorMessage,
    }
  )(UploadPage)
)
