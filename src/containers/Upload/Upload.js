import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { resetErrorMessage } from '../../actions/actions'

import { Table } from '../../components'
import ConnectedHeader from './ConnectedHeader'

class Upload extends Component {
  static propTypes = {
    // Injected by React Redux
    // errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node,
  }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <ConnectedHeader />
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
