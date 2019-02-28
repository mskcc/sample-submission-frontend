import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { uploadGridActions } from '../../actions'
import { resetErrorMessage } from '../../actions/commonActions'

import { Table } from '../../components'
import UploadFormContainer from './UploadFormContainer'

class UploadPage extends Component {
  handleSubmit = formContent => {
    if (this.props.columns.size > 0) {
    } else {
         this.props.getInitialColumns(formContent.material, formContent.application)

    }

    console.log(formContent)
  }

  render() {
    return (
      <React.Fragment>
        <UploadFormContainer handleSubmit={this.handleSubmit} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  columns: state.upload.grid.columns,
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
