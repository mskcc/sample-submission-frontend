import React from 'react'
import { Translate } from 'react-localize-redux'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'

import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Dropdown from './Dropdown'

class FormComponent extends React.Component {
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
      formErrors: {
        material: '',
        application: '',
        igo_request_id: '',
        number_of_samples: '',
        species: '',
        container: '',
        patient_id_format: '',
      },
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevState')
    console.log(prevState)
    console.log('state')
    console.log(this.state)
  }

  handleDropdownChange = event => {
    this.setState({ [event.id]: event.value })
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const {
      handleSubmit,
      handleApplicationChange,
      handleMaterialChange,
      onSelect,
      classes,
    } = this.props
    return (
      <Translate>
        {({ translate }) => (
          <div className={classes.form}>
            <form className={classes.container} onSubmit={handleSubmit}>
              <Dropdown
                onSelect={handleMaterialChange}
                onChange={this.handleDropdownChange}
                items={this.props.form.materials.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={this.props.form.isLoading}
                dynamic
                getInputProps={() => ({
                  id: 'material',

                  label: translate('header.material_label'),
                  helperText:
                    translate('header.material_helptext') +
                    ' (' +
                    this.props.form.materials.length +
                    ' choices)',
                  required: true,
                })}
              />

              <Dropdown
                onSelect={handleApplicationChange}
                onChange={this.handleDropdownChange}
                items={this.props.form.applications.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                loading={this.props.form.isLoading}
                dynamic
                getInputProps={() => ({
                  id: 'application',

                  label: translate('header.application_label'),
                  helperText:
                    translate('header.application_helptext') +
                    ' (' +
                    this.props.form.applications.length +
                    ' choices)',
                  required: true,
                })}
              />

              <Dropdown
                loading={this.props.form.isLoading}
                onChange={this.handleDropdownChange}
                items={this.props.form.containers.map(option => ({
                  value: option,
                  label: option,
                }))}
                required
                getInputProps={() => ({
                  id: 'container',
                  label: translate('header.container_label'),
                  helperText:
                    translate('header.container_helptext') +
                    ' (' +
                    this.props.form.containers.length +
                    ' choices)',
                  required: true,
                })}
              />

              <Dropdown
                items={this.props.form.picklists.Species.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                onChange={this.handleDropdownChange}
                getInputProps={() => ({
                  id: 'species',
                  label: translate('header.species_label'),
                  helperText: translate('header.species_helptext'),
                  required: true,
                })}
              />

              <Dropdown
                required
                items={this.props.form.picklists['Patient ID Format'].map(option => ({
                  value: option,
                  label: option,
                }))}
                onChange={this.handleDropdownChange}
                getInputProps={() => ({
                  id: 'patient_id_format',
                  label: translate('header.patient_id_format_label'),
                  helperText: translate('header.patient_id_format_helptext'),
                  required: true,
                })}
              />

              <TextField
                id="number_of_samples"
                className={classes.textField}
                required
                type="number"
                label={translate('header.sample_number_label')}
                helperText={translate('header.sample_number_helptext')}
                onChange={this.handleInputChange('number_of_samples')}
              />

              <TextField
                id="igo_request_id"
                className={classes.textField}
                // select
                required
                onChange={this.handleInputChange('igo_request_id')}
                label={translate('header.igo_request_id_label')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">IGO-</InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                type="submit"
                form="my-form-id"
                className={classes.button}
                color="secondary"
              >
                {translate('header.generate_button')}
              </Button>
            </form>
          </div>
        )}
      </Translate>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '70%',
  },
  form: {
    // backgroundColor: theme.palette.primary.light,
    gridArea: 'form',
    display: 'grid',
    justifyItems: 'center',
  },
  textField: {
    margin: 2 * theme.spacing.unit,

    minWidth: 350,
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

export default withStyles(styles)(FormComponent)
