import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import {
  getMaterialsAndApplications,
  getPicklist,
  showAllContainers,
  getApplicationsForMaterial,
  getMaterialsForApplication,
  resetMaterialsAndApplications,
} from '../../actions/actions'

import { FormComponent } from '../../components/Upload'

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

    this.state = {
      material: '',
      application: '',
      igo_request_id: '',
      number_of_samples: '',
      species: '',
      container: '',
      patient_id_format: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleMaterialChange = this.handleMaterialChange.bind(this)
    this.handleApplicationChange = this.handleApplicationChange.bind(this)

    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    this.props.getMaterialsAndApplications()
    this.props.getPicklist('Species')
  }
  handleSubmit = () => {
    // print the FormContainer values to the console
    console.log(this.state)
  }

  handleMaterialChange = selectedMaterial => {
    if (selectedMaterial) {
      this.props.getApplicationsForMaterial(selectedMaterial)
    } else this.setState({ material: selectedMaterial })

    this.props.showAllContainers(
      BSTMaterials.includes(selectedMaterial.toLowerCase())
    )
  }

  handleApplicationChange = selectedApplication => {
    if (selectedApplication) {
      this.props.getMaterialsForApplication(selectedApplication)
    } else this.props.resetMaterialsAndApplications()
    this.setState({ application: selectedApplication })
  }

  handleDropdownChange = event => {
    this.setState({ [event.id]: event.value })
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes, form } = this.props
    return (
      <FormComponent
        form={form}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        handleDropdownChange={this.handleDropdownChange}
        handleMaterialChange={this.handleMaterialChange}
        handleApplicationChange={this.handleApplicationChange}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
})

export default connect(
  mapStateToProps,
  {
    getPicklist,
    showAllContainers,
    getMaterialsAndApplications,
    getMaterialsForApplication,
    getApplicationsForMaterial,
    resetMaterialsAndApplications,
  }
)(FormContainer)
