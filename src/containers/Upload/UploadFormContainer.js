import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadFormActions } from '../../actions'

import { UploadForm } from '../../components'

export class UploadFormContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    // todo wait for token refresh!
    if (!this.props.form.initialFetched) {
      this.props.getInitialState()
    }
  }

  handleMaterialChange = selectedMaterial => {
    console.log(selectedMaterial)
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
  handleInputChange = (id, value) => {
    console.log(id + value)
    if (value) {
      this.props.select(id, value)
    } else this.props.clear(id)
  }

  render() {
    const {
      classes,
      form,
      handleSubmit,
      gridIsLoading,
      nothingToChange,
    } = this.props
    return form && form.allMaterials ? (
      <UploadForm
        form={form}
        gridIsLoading={gridIsLoading}
        nothingToChange={nothingToChange}
        handleSubmit={handleSubmit}
        handleMaterialChange={this.handleMaterialChange}
        handleApplicationChange={this.handleApplicationChange}
        handleSpeciesChange={this.handleSpeciesChange}
        handleInputChange={this.handleInputChange}
      />
    ) : (
      <div />
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
