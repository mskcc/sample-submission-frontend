import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadGridActions } from '../../actions'

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

  render() {
    const { classes, grid, handleSubmit } = this.props
    return <UploadGrid grid={grid} handleSubmit={handleSubmit} />
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
