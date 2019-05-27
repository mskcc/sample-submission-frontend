import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadGridActions } from '../../actions'

import CircularProgress from '@material-ui/core/CircularProgress'

import { UploadGrid } from '../../components/Upload'

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

  handleSubmit = () => {
    this.props.addGridToBankedSample(this.props.grid)
  }

  handleSave = () => {
    this.props.savePartialSubmission(this.props.grid)
  }

  render() {
    const { grid, handleSubmit } = this.props

    return grid.rows.length > 0 ? (
      <UploadGrid
        grid={grid}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleSave={this.handleSave}
      />
    ) : null
  }
}

const mapStateToProps = state => ({
  grid: state.upload.grid,
})

const mapDispatchToProps = {
  ...uploadGridActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadGridContainer)
