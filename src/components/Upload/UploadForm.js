import React from 'react'
import { Translate } from 'react-localize-redux'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import {
  FormControl,
  InputAdornment,
  Paper,
  withStyles,
} from '@material-ui/core'

import { Button, Checkbox, Dropdown, Input } from '../index'

class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        ...this.props.form.selected,
      },
      formValid: {
        material: true,
        application: true,
        service_id: true,
        number_of_samples: true,
        species: true,
        container: true,
        patient_id_type: true,
      },
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('prevState')
    // console.log(prevState)
    // console.log('state')
    // console.log(this.state)
  }

  handleDropdownChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.id]: event.value,
      },
      formValid: { ...this.state.formValid, [event.id]: true },
    })
    this.props.handleInputChange(event.id, event.value)
  }

  handleChange = () => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.id]: event.target.value,
      },
      formValid: { ...this.state.formValid, [event.target.id]: true },
    })
    this.props.handleInputChange(event.target.id, event.target.value)
  }

  handleServiceIdCheck = name => () => {
    var date = new Date()
    var timestamp = date.getTime()

    this.setState({
      values: {
        ...this.state.values,
        service_id: timestamp,
        [name]: event.target.checked,
      },

      formValid: { ...this.state.formValid, service_id: true },
    })
    if (event.target.checked) {
      this.props.handleInputChange('service_id', timestamp)
      this.props.handleInputChange('alt_service_id', true)
    } else {
      this.props.handleInputChange('service_id', '')
      this.props.handleInputChange('alt_service_id', false)
    }
  }

  handleGroupingCheck = name => () => {
    this.setState({
      values: { ...this.state.values, grouping_checked: event.target.checked },
    })
    this.props.handleInputChange('grouping_checked', event.target.checked)
  }

  handleSubmit = (e, handleParentSubmit) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.validate()) {
      handleParentSubmit({
        ...this.state.values,

        service_id: 'IGO-' + this.state.values.service_id.toString(),
      })
    }
  }

  validate() {
    let formValid = this.state.formValid
    let valid
    let error
    let isValidOption
    let values = this.props.form.selected
    for (let value in values) {
      switch (value) {
        case 'service_id':
          if (values.alt_service_id) {
            formValid[value] = true
          } else {
            formValid[value] =
              /\d{6}/g.test(values[value]) && values[value].length === 6
          }
          break
        case 'material':
          // validate whether selected value in dynamic fields is in controlled options
          // (could fail if user was extremely quick to select
          // invalid material/app combination)
          isValidOption = this.props.form.filteredMaterials.some(function(el) {
            return el.value === values[value]
          })

          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'application':
          isValidOption = this.props.form.filteredApplications.some(function(
            el
          ) {
            return el.value === values[value]
          })

          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'container':
          isValidOption = this.props.form.filteredContainers.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'species':
          isValidOption = this.props.form.filteredSpecies.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'patient_id_type':
          // only validate if species mandates a format, else value will be disregarded anyway
          if (
            this.state.values.species == 'Human ' &&
            this.state.values.patient_id_type ==
              'MSK-Patients (or derived from MSK Patients)'
          ) {
            isValidOption = this.props.form.picklists.PatientIDTypes.some(
              function(el) {
                return el.value === values[value]
              }
            )
            formValid[value] = isValidOption && values[value].length > 0
            break
          } else {
            formValid[value] = true
            break
          }

        case 'number_of_samples':
          formValid[value] = values[value] > 0
          break
        default:
          break
      }
    }

    this.setState({
      formValid: {
        ...formValid,
      },
    })
    // checked all fields, now check form
    return this.validateForm()
  }

  validateForm() {
    return (
      this.state.formValid.service_id &&
      this.state.formValid.material &&
      this.state.formValid.application &&
      this.state.formValid.service_id &&
      this.state.formValid.number_of_samples &&
      this.state.formValid.species &&
      this.state.formValid.container &&
      this.state.formValid.patient_id_type
    )
  }

  render() {
    const {
      classes,
      form,
      handleSubmit,
      handleApplicationChange,
      handleMaterialChange,
      handleSpeciesChange,
      gridIsLoading,
      nothingToChange,
    } = this.props
    const { formValid, values } = this.state
    const buttonClassname = classNames({
      [classes.buttonSuccess]: !this.props.gridIsLoading,
    })
    return (
      <Translate>
        {({ translate }) => (
          <Paper className={classes.container} elevation={1}>
            <form
              id="upload-form"
              className={classes.form}
              onSubmit={e => this.handleSubmit(e, handleSubmit)}
            >
              <Dropdown
                id="material"
                error={!formValid.material}
                onSelect={handleMaterialChange}
                onChange={this.handleDropdownChange}
                items={form.filteredMaterials.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
                dynamic
                value={{
                  value: form.selected.material,
                  label: form.selected.material,
                }}
              />

              <Dropdown
                id="application"
                error={!formValid.application}
                onSelect={handleApplicationChange}
                onChange={this.handleDropdownChange}
                items={form.filteredApplications.map(option => ({
                  value: option.value,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
                dynamic
                value={{
                  value: form.selected.application,
                  label: form.selected.application,
                }}
              />
              <FormControl component="fieldset">
                <Dropdown
                  id="species"
                  error={!formValid.species}
                  onSelect={handleSpeciesChange}
                  onChange={this.handleDropdownChange}
                  loading={form.formIsLoading}
                  items={form.filteredSpecies.map(option => ({
                    value: option.value,
                    label: option.value,
                  }))}
                  value={{
                    value: form.selected.species,
                    label: form.selected.species,
                  }}
                  dynamic
                />
                {values.species == 'Mouse' ||
                values.species == 'Mouse_GeneticallyModified' ? (
                  <Checkbox
                    id="grouping_checkbox"
                    checked={form.selected.grouping_checked}
                    onChange={this.handleGroupingCheck}
                  />
                ) : null}
              </FormControl>

              {// PatientID is needed when Human is selected or when Mouse* is selected and combined with species checkbox value
              this.props.form.patientIDTypeNeedsFormatting &&
              form.picklists.PatientIDTypes &&
              (values.species == 'Human' && !this.state.grouping_checked) ? (
                <Dropdown
                  id={
                    this.state.grouping_checked
                      ? 'group_id_type'
                      : 'patient_id_type'
                  }
                  value={this.props.form.patientIDType}
                  error={!formValid.patient_id_type}
                  onChange={this.handleDropdownChange}
                  items={form.picklists.PatientIDTypes.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                  value={{
                    value: form.selected.patient_id_type,
                    label: form.selected.patient_id_type,
                  }}
                />
              ) : null}

              <Dropdown
                id="container"
                error={!formValid.container}
                onChange={this.handleDropdownChange}
                items={form.filteredContainers.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
                value={{
                  value: form.selected.container,
                  label: form.selected.container,
                }}
              />

              <Input
                id="number_of_samples"
                error={!formValid.number_of_samples}
                onChange={this.handleChange}
                inputProps={{
                  inputProps: { min: 0 },
                }}
                value={form.selected.number_of_samples}
              />
              <FormControl component="fieldset">
                <Input
                  id="service_id"
                  value={form.selected.service_id}
                  error={!formValid.service_id}
                  onChange={this.handleChange}
                  inputProps={{
                    disabled: form.selected.alt_service_id,
                    startAdornment: (
                      <InputAdornment position="start">IGO-</InputAdornment>
                    ),
                  }}
                />
                <Checkbox
                  id="alt_service_id"
                  checked={form.selected.alt_service_id}
                  onChange={this.handleServiceIdCheck}
                  hasHelptext
                />
              </FormControl>
            </form>
            <div>
              <Button
                color="primary"
                id="form_submit"
                formId="upload-form"
                isLoading={gridIsLoading}
                nothingToSubmit={nothingToChange}
              />

              <Button
                color="secondary"
                id="form_clear"
                onClick={this.props.handleClear}
                isLoading={false}
                nothingToSubmit={false}
              />
            </div>
          </Paper>
        )}
      </Translate>
    )
  }
}

UploadForm.defaultProps = {
  form: {
    initialFetched: false,
    allContainers: [{ id: 'test', value: 'test' }],
    allApplications: [{ id: 'test', value: 'test' }],
    allMaterials: [{ id: 'test', value: 'test' }],
    allPatientIdFormats: [{ id: 'test', value: 'test' }],
    filteredApplications: [{ id: 'test', value: 'test' }],
    filteredSpecies: [{ id: 'test', value: 'test' }],
    filteredMaterials: [{ id: 'test', value: 'test' }],
    formIsLoading: false,
    filteredContainers: [
      { id: 'Plates', value: 'Plates' },
      { id: 'Micronic Barcoded Tubes', value: 'Micronic Barcoded Tubes' },
    ],

    allSpecies: [{ id: 'test', value: 'test' }],
    patientIDTypeNeedsFormatting: false,
    selected: {
      application: '',
      material: '',
      service_id: '',
      number_of_samples: '',
      species: '',
      container: '',
      patient_id_type: '',
      grouping_checked: false,
      alt_service_id: false,
    },

    handleSubmit: () => {},
    handleApplicationChange: () => {},
    handleMaterialChange: () => {},
    handleSpeciesChange: () => {},
    gridIsLoading: () => {},
    nothingToChange: () => {},
  },
}

UploadForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  handleApplicationChange: PropTypes.func,
  handleMaterialChange: PropTypes.func,
}

const styles = theme => ({
  container: {
    // backgroundColor: "rgba(143, 199, 232, .1)",
    gridArea: 'form',
    display: 'grid',
    justifyItems: 'center',
    width: '80%',
    maxWidth: '1200px',
    margin: '2em auto',
    padding: '2em',
    marginBottom: '4em',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',

    // justifyContent: 'space-between',
  },

  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },

  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  nothingToChange: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -53,
    marginLeft: -65,
  },
})

export default withStyles(styles)(UploadForm)
