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

import { Button, Checkbox, Dropdown, Input } from './index'

class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // values: {
      //   material: '',
      //   application: '',
      //   igo_request_id: '',
      //   number_of_samples: '',
      //   species: '',
      //   container: '',
      //   patient_id_type: '',
      // },
      values: {
        material: 'Cells',
        application: 'CustomCapture',
        igo_request_id: '444444',
        number_of_samples: '4',
        species: 'Human',
        container: 'Plates',
        patient_id_type: 'MSK-Patients (or derived from MSK Patients)',
      },
      // values: {
      //   material: 'Tissue',
      //   application: 'CustomCapture',
      //   igo_request_id: '444444',
      //   number_of_samples: '400',
      //   species: 'Tuberculosis',
      //   container: 'Plates',
      //   patient_id_type: '',
      // },
      // formErrors: {},
      igo_alternative_id: false,
      species_samples_checked: false,
      formValid: {
        // form: false,
        material: true,
        application: true,
        igo_request_id: true,
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
  }

  handleChange = () => {
    // reset error
    this.setState({
      values: {
        ...this.state.values,
        [event.target.id]: event.target.value,
      },
      formValid: { ...this.state.formValid, [event.target.id]: true },
    })
  }

  handleIGOCheck = name => () => {
    let date = this.getDate()

    this.setState({
      values: {
        ...this.state.values,
        igo_request_id: date,
      },
      [name]: event.target.checked,
    })
  }

  handleSpeciesCheck = name => () => {
    this.setState({
      species_samples_checked: event.target.checked,
    })
  }

  getDate = () => {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 //January is 0!
    let yyyy = today
      .getFullYear()
      .toString()
      .substr(-2)

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    return mm + dd + yyyy
  }

  handleSubmit = (e, handleParentSubmit) => {
    e.preventDefault()
    e.stopPropagation()

    if (this.validate()) {
      handleParentSubmit(this.state.values)
    }
    // } else alert('error')
  }

  validate() {
    // let formErrors = this.state.formErrors
    let formValid = this.state.formValid
    let valid
    let error
    let isValidOption
    let values = this.state.values
    for (let value in values) {
      switch (value) {
        case 'igo_request_id':
          formValid[value] =
            /\d{6}/g.test(values[value]) && values[value].length === 6
          break
        case 'material':
          // validate whether selected value in dynamic fields is in controlled options
          // (could fail if user was extremely quick to select
          // invalid material/app combination)
          isValidOption = this.props.form.materials.some(function(el) {
            return el.value === values[value]
          })

          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'application':
          isValidOption = this.props.form.applications.some(function(el) {
            return el.value === values[value]
          })

          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'container':
          isValidOption = this.props.form.containers.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'species':
          isValidOption = this.props.form.species.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = isValidOption && values[value].length > 0
          break

        case 'patient_id_type':
          // only validate if species mandates a format, else value will be disregarded anyway
          if (this.props.form.patientIDTypeNeedsFormatting) {
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
      this.state.formValid.igo_request_id &&
      this.state.formValid.material &&
      this.state.formValid.application &&
      this.state.formValid.igo_request_id &&
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
                items={form.materials.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
                dynamic
              />

              <Dropdown
                id="application"
                error={!formValid.application}
                onSelect={handleApplicationChange}
                onChange={this.handleDropdownChange}
                items={form.applications.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
                dynamic
              />
              <FormControl component="fieldset">
                <Dropdown
                  id="species"
                  error={!formValid.species}
                  onSelect={handleSpeciesChange}
                  onChange={this.handleDropdownChange}
                  items={form.species.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                  dynamic
                />
                {this.props.form.patientIDTypeNeedsFormatting &&
                (values.species == 'Mouse' ||
                  values.species == 'Mouse_GeneticallyModified') ? (
                  <Checkbox
                    id="species_checkbox"
                    checked={this.state.species_samples_checked}
                    onChange={this.handleSpeciesCheck}
                  />
                ) : null}
              </FormControl>

              {// PatientID is needed when Human is selected or when Mouse* is selected and combined with species checkbox value
              this.props.form.patientIDTypeNeedsFormatting &&
              form.picklists.PatientIDTypes &&
              (values.species == 'Human' &&
                !this.state.species_samples_checked) ? (
                <Dropdown
                  id={
                    this.state.species_samples_checked
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
                />
              ) : null}

              <Dropdown
                id="container"
                error={!formValid.container}
                onChange={this.handleDropdownChange}
                items={form.containers.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
              />

              <Input
                id="number_of_samples"
                error={!formValid.number_of_samples}
                onChange={this.handleChange}
                inputProps={{
                  inputProps: { min: 0 },
                }}
              />
              <FormControl component="fieldset">
                <Input
                  id="igo_request_id"
                  value={values.igo_request_id}
                  error={!formValid.igo_request_id}
                  onChange={this.handleChange}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position="start">IGO-</InputAdornment>
                    ),
                  }}
                />
                <Checkbox
                  id="igo_alternative_id"
                  checked={this.state.igo_alternative_id}
                  onChange={this.handleIGOCheck}
                  hasHelptext
                />
              </FormControl>
            </form>
            <Button
              id="upload-form-submit"
              formId="upload-form"
              gridIsLoading={gridIsLoading}
              nothingToChange={nothingToChange}
            />{' '}
          </Paper>
        )}
      </Translate>
    )
  }
}

UploadForm.defaultProps = {
  form: {
    allContainers: [{ id: 'id', value: 'value' }],
    allApplications: [{ id: 'id', value: 'value' }],
    allMaterials: [{ id: 'id', value: 'value' }],
    allpatientIDTypes: [],
    applications: [{ id: 'id', value: 'value' }],
    containers: [{ id: 'id', value: 'value' }],
    formIsLoading: false,
    filteredContainers: [{ id: 'id', value: 'value' }],
    filteredContainersBS: [{ id: 'id', value: 'value' }],
    materials: [{ id: 'id', value: 'value' }],
    selectedApplication: '',
    selectedMaterial: '',
    species: [{ id: 'id', value: 'value' }],
    patientIDTypeNeedsFormatting: false,
    picklists: { PatientIDTypes: [{ id: 'id', value: 'value' }] },
  },
  gridIsLoading: false,
  nothingToChange: false,
}

UploadForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  handleApplicationChange: PropTypes.func,
  handleMaterialChange: PropTypes.func,
}

const styles = theme => ({
  container: {
    gridArea: 'form',
    display: 'grid',
    justifyItems: 'center',
    width: '50%',
    margin: '2em auto',
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
  button: {
    margin: theme.spacing.unit,
    height: 50,
    display: 'inline-block',
    width: 300,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
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
