import React from 'react'
import { Translate } from 'react-localize-redux'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import { Checkbox, Dropdown, Input } from './index'

import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

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
      //   patient_id_format: '',
      // },
      // values: {
      //   material: 'Cells',
      //   application: 'CustomCapture',
      //   igo_request_id: '444444',
      //   number_of_samples: '4',
      //   species: 'Human',
      //   container: 'Plates',
      //   patient_id_format: 'MRN',
      // },
      values: {
        material: 'Tissue',
        application: 'ImmunoSeq',
        igo_request_id: '444444',
        number_of_samples: '4',
        species: 'Human',
        container: 'Plates',
        patient_id_format: 'MRN',
      },
      // formErrors: {},
      igo_alternative_id: false,
      show_patient_id_format: this.props.form.show_patient_id_format,
      formValid: {
        // form: false,
        material: true,
        application: true,
        igo_request_id: true,
        number_of_samples: true,
        species: true,
        container: true,
        patient_id_format: true,
      },
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevState')
    console.log(prevState)
    console.log('state')
    console.log(this.state)
  }

  handleDropdownChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.id]: event.value,
      },
    })
  }

  handleChange = () => {
    // reset error
    this.setState({
      values: {
        ...this.state.values,
        [event.target.id]: event.target.value,
      },
    })
  }

  handleSpeciesChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.id]: event.value,
      },
    })
    this.props.handleSpeciesChange(event.value)
    if (!this.props.form.show_patient_id_format) {
      this.setState({
        values: {
          ...this.state.values,
          // doesn't clear enough
          patient_id_format: '',
        },
      })
    }
  }

  handleCheck = name => () => {
    let date = this.getDate()

    this.setState({
      values: {
        ...this.state.values,
        igo_request_id: date,
      },
      [name]: event.target.checked,
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

        case 'patient_id_format':
          // only validate if species mandates a format, else value will be disregarded anyway
          if (this.props.form.show_patient_id_format) {
            isValidOption = this.props.form.patientIdFormats.some(function(
              el
            ) {
              return el.value === values[value]
            })
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
      this.state.formValid.patient_id_format
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
    } = this.props
    const { formValid, values } = this.state

    return (
      <Translate>
        {({ translate }) => (
          <div className={classes.form}>
            <form
              id="upload-form"
              className={classes.container}
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

              <Dropdown
                id="container"
                error={!formValid.container}
                onChange={this.handleSpeciesChange}
                items={form.containers.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.formIsLoading}
              />

              <Dropdown
                id="species"
                error={!formValid.species}
                onChange={this.handleSpeciesChange}
                items={form.species.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
              />
              {this.props.form.show_patient_id_format ? (
                <Dropdown
                  id="patient_id_format"
                  error={!formValid.patient_id_format}
                  onChange={this.handleDropdownChange}
                  items={form.patientIdFormats.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                />
              ) : null}

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
                  onChange={this.handleCheck}
                />
              </FormControl>
            </form>

            <Button
              variant="contained"
              type="submit"
              form="upload-form"
              className={classes.button}
              color="secondary"
            >
              {translate('upload.form.generate_button')}
            </Button>
          </div>
        )}
      </Translate>
    )
  }
}

UploadForm.defaultProps = {
  form: {},
}

UploadForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  handleApplicationChange: PropTypes.func,
  handleMaterialChange: PropTypes.func,
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '70%',
    justifyContent: 'space-between',
  },
  form: {
    gridArea: 'form',
    display: 'grid',
    justifyItems: 'center',
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
})

export default withStyles(styles)(UploadForm)
