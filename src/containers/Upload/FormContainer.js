import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import {
  getMaterialsAndApplications,
  getPicklist,
  getApplicationsForMaterial,
  getMaterialsForApplication,
  resetMaterialsAndApplications,
} from '../../actions/actions'

import { FormComponent, DropdownField } from '../../components/Upload'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.handleMaterialChange = this.handleMaterialChange.bind(this)
    this.handleApplicationChange = this.handleApplicationChange.bind(this)
  }

  componentDidMount() {
    this.props.getMaterialsAndApplications()
    this.props.getPicklist('Species')
  }

  handleMaterialChange = selectedMaterial => {
    if (selectedMaterial) {
      this.props.getApplicationsForMaterial(selectedMaterial)
    } else this.props.resetMaterialsAndApplications()
  }
  handleApplicationChange = selectedApplication => {
    if (selectedApplication) {
      this.props.getMaterialsForApplication(selectedApplication)
    } else this.props.resetMaterialsAndApplications()
  }

  render() {
    const { classes, form, handleSubmit } = this.props
    return (
      <FormComponent
        form={form}
        handleChange={this.handleChange}
        handleMaterialChange={this.handleMaterialChange}
        handleApplicationChange={this.handleApplicationChange}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
})
const formConfig = { form: 'generateTable' }

const FromWithRedux = connect(
  mapStateToProps,
  {
    getPicklist,
    getMaterialsAndApplications,
    getMaterialsForApplication,
    getApplicationsForMaterial,
    resetMaterialsAndApplications,
  }
)(Form)

export default reduxForm(formConfig)(FromWithRedux)
