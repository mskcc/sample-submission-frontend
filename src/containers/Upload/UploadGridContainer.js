import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadGridActions, userActions } from '../../actions'

import CircularProgress from '@material-ui/core/CircularProgress'

import { UploadGrid } from '../../components'

class UploadGridContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(prevProps, prevState) {
    // console.log('prevState')
    // console.log(prevState)
    // console.log('state')
    // console.log(this.state)
  }

  handleChange = () => {
    this.props.registerGridChange()
  }
 handleMRN = (row) => {
    this.props.handleMRN(row)
  }



  handleSubmit = () => {
    this.props.addGridToBankedSample(this.props.grid)
  }

  handleSave = () => {
    if (
      this.submissionExists(
        this.props.grid.form.igo_request_id,
        this.props.user.submissions
      )
    ) {
      swal(
        'A request with this IGO ID and your username already exists. Do you want to overwrite?',
        { buttons: ['Cancel', true] }
      ).then(value => {
        if (value) {
          this.props.savePartialSubmission(this.props.grid)
        }
      })
    } else {
      this.props.savePartialSubmission(this.props.grid)
    }
  }

  submissionExists = (igo_request_id, submissions) => {
    return submissions.some(e => e.igo_request_id === igo_request_id)
  }

  render() {
    const { grid, user, handleSubmit } = this.props

    return grid.rows.length > 0 ? (
      <UploadGrid
        grid={grid}
        user={user}
        handleMRN={this.handleMRN}
        handleSubmit={this.handleSubmit}
        handleSave={this.handleSave}
      />
    ) : null
  }
}

const mapStateToProps = state => ({
  grid: state.upload.grid,
  user: state.user,
})

const mapDispatchToProps = {
  ...uploadGridActions,
  ...userActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadGridContainer)
