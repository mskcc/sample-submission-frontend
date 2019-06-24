import React, { Component } from 'react'

import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { uploadGridActions, userActions } from '../../actions'

import CircularProgress from '@material-ui/core/CircularProgress'

import { UploadGrid } from '../../components'

class UploadGridContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount(prevProps, prevState) {
  // console.log('prevState')
  // console.log(prevState)
  // console.log('state')
  // console.log(this.state)
  // }

  handleChange = changes => {
    this.props.registerGridChange(changes)
  }
  handleMRN = rowIndex => {
    this.props.handleMRN(rowIndex)
  }
  handleIndex = (colIndex, rowIndex, newValue) => {
    this.props.handleIndex(colIndex, rowIndex, newValue)
  }
  handleAssay = (rowIndex, oldValue, newValue) => {
    this.props.handleAssay(rowIndex, oldValue, newValue)
  }

  handleClear = () => {
    Swal.fire({
      title: 'Are you sure?',
      text:
        "You won't be able to revert this unless you have a saved partial submission.",
      type: 'warning',
      showCancelButton: true,
      animation: false,
      confirmButtonColor: '#df4602',
      cancelButtonColor: '#007cba',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        this.props.handleClear()
        // this.hotTableComponent.current.hotInstance.clear()
      }
    })
  }

  handleSubmit = () => {
    this.props.handleSubmit()
  }

  handleSave = () => {
    if (
      this.submissionExists(
        this.props.grid.form.service_id,
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

  submissionExists = (service_id, submissions) => {
    return submissions.some(e => e.service_id === service_id)
  }

  render() {
    const { grid, user, handleSubmit } = this.props

    return grid.rows.length > 0 ? (
      <UploadGrid
        grid={grid}
        user={user}
        handleMRN={this.handleMRN}
        handleIndex={this.handleIndex}
        handleAssay={this.handleAssay}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
        preValidate={this.props.preValidate}
        handlePatientId={this.props.handlePatientId}
        handleClear={this.handleClear}
      />
    ) : null
  }
}

UploadGridContainer.defaultProps = {
  grid: {},
  user: {},
  handleMRN: () => {},
  handleIndex: () => {},
  handleAssay: () => {},
  handleSubmit: () => {},
  handleChange: () => {},
  handleSave: () => {},
  preValidate: () => {},
  handlePatientId: () => {},
  handleClear: () => {},
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
