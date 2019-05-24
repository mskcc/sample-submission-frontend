import React from 'react'
import { connect } from 'react-redux'
import { commonActions } from '../actions'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    if (!this.props.loading && !this.props.loggedIn) {
      return <Redirect to="/login" />
    }
    return (
      this.props.loading && <CircularProgress color="secondary" size={24} />
    )
  }
}
const mapStateToProps = state => ({
  ...state.common,
})
const mapDispatchToProps = {
  ...commonActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)
