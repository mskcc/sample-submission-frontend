import React from 'react'
import { connect } from 'react-redux'
import { commonActions } from '../actions'

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return null
  }
}
const mapStateToProps = state => ({
  ...state.common,
})
const mapDispatchToProps = {
  ...commonActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
