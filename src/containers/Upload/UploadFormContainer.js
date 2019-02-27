import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadFormActions } from '../../actions'

import { UploadForm } from '../../components/Upload'

// materials that be combined with a Blocks/Slides/Tubes container
const BSTMaterials = ['tissue', 'cells', 'blood', 'buffy coat', 'other']

class UploadFormContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {

    this.props.getInitialState()
    // this.props.getMaterialsAndApplications()
    // this.props.getPicklist('Species')
  }
  handleSubmit = formContent => {
    // check for cache/existing columns in store
    this.props.getInitialColumns('Cells','CustomCapture')
  }

  handleMaterialChange = selectedMaterial => {
    if (selectedMaterial) {
      // get possible applications for this material
      this.props.getApplicationsForMaterial(selectedMaterial)
    } else {
      this.props.clearMaterial()
      setTimeout(() => {
        this.props.cleared
      }, 500)
    }
    // show containers depending on material combination
    this.filterContainers(selectedMaterial)
  }

  filterContainers = selectedMaterial => {
    if (selectedMaterial === 'Blocks/Slides') {
      this.props.filterContainers('b/s')
    } else if (BSTMaterials.includes(selectedMaterial.toLowerCase())) {
      this.props.filterContainers('all')
    } else this.props.filterContainers()
  }
  
  handleApplicationChange = selectedApplication => {
    if (selectedApplication) {
      // get possible ,materials for this application
      this.props.getMaterialsForApplication(selectedApplication)
    } else {
      this.props.clearApplication()
      setTimeout(() => {
        this.props.cleared
      }, 500)
    }
  }

  render() {
    const { classes, form } = this.props
    return (
      <UploadForm
        form={form}
        handleSubmit={this.handleSubmit}
        handleMaterialChange={this.handleMaterialChange}
        handleApplicationChange={this.handleApplicationChange}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.upload.form,
})

const mapDispatchToProps = {
  ...uploadFormActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFormContainer)
