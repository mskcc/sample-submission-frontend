import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadFormActions } from '../../actions'

import { UploadForm } from '../../components/Upload'

export class UploadFormContainer extends React.Component {
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
    }
  }

  handleSpeciesChange = selectedSpecies => {
    if (selectedSpecies) {
      this.props.getFormatterForSpecies(selectedSpecies)
    } else this.props.clearSpecies()
  }

  render() {
    const {
      classes,
      form,
      handleSubmit,
      gridIsLoading,
      nothingToChange,
    } = this.props
    return (
      <UploadForm
        form={form}
        gridIsLoading={gridIsLoading}
        nothingToChange={nothingToChange}
        handleSubmit={handleSubmit}
        handleMaterialChange={this.handleMaterialChange}
        handleApplicationChange={this.handleApplicationChange}
        handleSpeciesChange={this.handleSpeciesChange}
      />
    )
  }
}

UploadFormContainer.defaultProps = {
  getInitialState: () => {},
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
