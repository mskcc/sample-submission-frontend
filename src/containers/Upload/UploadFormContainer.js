import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadFormActions } from '../../actions'

import { UploadForm } from '../../components/Upload'

class UploadFormContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    this.props.getInitialState()
  }
  // handleSubmit = formValues => {
  // this.props.handleSubmit(formValues)
  // }

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
    this.props.filterContainers(selectedMaterial)
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

  handleSpeciesChange = selectedSpecies => {
    if (selectedSpecies) {
      this.props.getFormatterForSpecies(selectedSpecies)
    } else this.props.clearSpecies()
  }

  render() {
    const { classes, form, handleSubmit } = this.props
    return (
      <UploadForm
        form={form}
        handleSubmit={handleSubmit}
        handleMaterialChange={this.handleMaterialChange}
        handleApplicationChange={this.handleApplicationChange}
        handleSpeciesChange={this.handleSpeciesChange}
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
