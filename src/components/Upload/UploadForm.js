import React from 'react'
import { Translate } from 'react-localize-redux'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Dropdown from './Dropdown'
import Input from './Input'

class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        material: '',
        application: '',
        igo_request_id: '',
        number_of_samples: '',
        species: '',
        container: '',
        patient_id_format: '',
      },
      // formErrors: {},
      formValid: {
        form: true,
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

  handleSubmit = (e, handleParentSubmit) => {
    e.preventDefault()
    e.stopPropagation()
    this.validate()
    if (this.state.formValid.form) {
      handleParentSubmit(this.state)
    } else alert('error')
  }

  validate() {
    // let formErrors = this.state.formErrors
    let formValid = this.state.formValid
    let valid
    let error
    let found
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
          found = this.props.form.materials.some(function(el) {
            return el.value === values[value]
          })

          formValid[value] = found && values[value].length > 0
          break

        case 'application':
          found = this.props.form.applications.some(function(el) {
            return el.value === values[value]
          })

          formValid[value] = found && values[value].length > 0
          break

        case 'container':
          found = this.props.form.containers.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = found && values[value].length > 0
          break

        case 'species':
          found = this.props.form.species.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = found && values[value].length > 0
          break

        case 'patient_id_format':
          found = this.props.form.patient_id_formats.some(function(el) {
            return el.value === values[value]
          })
          formValid[value] = found && values[value].length > 0
          break

        case 'number_of_samples':
          formValid[value] = values[value] > 0
          break
        default:
          break
      }
    }

    this.setState({
      formValid: {
        ...this.state.formValid,
        formValid,
      },
    })
    // checked all fields, now check form
    this.validateForm()
  }

  validateForm() {
    this.setState({
      formValid: {
        ...this.state.formValid,
        form:
          this.state.formValid.igo_request_id &&
          this.state.formValid.material &&
          this.state.formValid.application &&
          this.state.formValid.igo_request_id &&
          this.state.formValid.number_of_samples &&
          this.state.formValid.species &&
          this.state.formValid.container &&
          this.state.formValid.patient_id_format,
      },
    })
  }

  render() {
    const {
      classes,
      form,
      handleSubmit,
      handleApplicationChange,
      handleMaterialChange,
    } = this.props
    const { formValid} = this.state

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
                loading={form.isLoading}
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
                loading={form.isLoading}
                dynamic
              />

              <Dropdown
                id="container"
                error={!formValid.container}
                onChange={this.handleDropdownChange}
                items={form.containers.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={form.isLoading}
              />

              <Dropdown
                id="species"
                error={!formValid.species}
                onChange={this.handleDropdownChange}
                items={form.species.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
              />

              <Dropdown
                id="patient_id_format"
                error={!formValid.patient_id_format}
                onChange={this.handleDropdownChange}
                items={form.patient_id_formats.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
              />

              <Input
                id="number_of_samples"
                error={!formValid.number_of_samples}
                onChange={this.handleChange}
                inputProps={{
                  inputProps: { min: 0 },
                }}
              />
              <Input
                id="igo_request_id"
                error={!formValid.igo_request_id}
                onChange={this.handleChange}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">IGO-</InputAdornment>
                  ),
                }}
              />
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
    marginTop: '3em',
    display: 'inline-block',
    width: 350,
  },
})

export default withStyles(styles)(UploadForm)
