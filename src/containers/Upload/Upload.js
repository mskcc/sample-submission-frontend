import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { resetErrorMessage } from '../../actions/actions'

import { Table } from '../../components'
import FormContainer from './FormContainer'

class Upload extends Component {
  submit = values => {
    // print the FormContainer values to the console
    console.log(values)
  }

  render() {
    return (
      <React.Fragment>
        <FormContainer onSubmit={this.submit} />
        <Table />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
})

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchMaterialsAndApplications: article =>
//       dispatch(fetchMaterialsAndApplications()),
//       resetErrorMessage
//   }
// }

export default withLocalize(
  connect(
    mapStateToProps,
    {
      resetErrorMessage,
    }
  )(Upload)
)
