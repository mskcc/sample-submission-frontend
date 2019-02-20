import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { uploadFormActions } from '../../actions'

import { FormComponent } from '../../components/Upload'

// materials that be combined with a Blocks/Slides/Tubes container
const BSTMaterials = [
  'tissue',
  'cells',
  'blood',
  'blocks/slides',
  'buffy coat',
  'other',
]

class FormContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    this.props.getMaterialsAndApplications()
    this.props.getPicklist('Species')
  }
  handleSubmit = () => {
    console.log(this.state)
  }

  handleMaterialChange = selectedMaterial => {
    if (selectedMaterial) {
      // get possible applications for this material
      this.props.getApplicationsForMaterial(selectedMaterial)
    } else this.props.clearMaterial()

    // show containers depending on material combination
    this.props.showAllContainers(
      BSTMaterials.includes(selectedMaterial.toLowerCase())
    )
  }

  handleApplicationChange = selectedApplication => {
    if (selectedApplication) {
      // get possible ,materials for this application
      this.props.getMaterialsForApplication(selectedApplication)
    } else this.props.clearApplication()
  }

  render() {
    const { classes, form } = this.props
    return (
      <FormComponent
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
)(FormContainer)
