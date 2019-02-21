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
    console.log(this.state)
  }

  render() {
    const {
      classes,
      form,
      handleSubmit,
      handleApplicationChange,
      handleMaterialChange,
    } = this.props

    return (
      <Translate>
        {({ translate }) => (
          <div className={classes.form}>
            <form className={classes.container} onSubmit={handleSubmit}>
              <Dropdown
                dynamic={true}
                loading={form.isLoading}
                onSelect={handleMaterialChange}
                onChange={this.handleDropdownChange}
                items={form.materials.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                getInputProps={() => ({
                  id: 'material',
                  label: translate('header.material_label'),
                  helperText:
                    translate('header.material_helptext') +
                    ' (' +
                    form.materials.length +
                    ' choices)',
                  required: true,
                })}
              />

              <Dropdown
                dynamic={true}
                loading={form.isLoading}
                onSelect={handleApplicationChange}
                onChange={this.handleDropdownChange}
                items={form.applications.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                getInputProps={() => ({
                  id: 'application',
                  label: translate('header.application_label'),
                  helperText:
                    translate('header.application_helptext') +
                    ' (' +
                    form.applications.length +
                    ' choices)',
                  required: true,
                })}
              />

              <Dropdown
                loading={form.isLoading}
                onChange={this.handleDropdownChange}
                items={form.containers.map(option => ({
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
                    form.containers.length +
                    ' choices)',
                  required: true,
                })}
              />

              <Dropdown
                items={form.picklists.Species.map(option => ({
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
                items={form.picklists['Patient ID Format'].map(option => ({
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

              <Input
                id="number_of_samples"
                classes={classes.textField}
                type="number"
                label={translate('header.sample_number_label')}
                helperText={translate('header.sample_number_helptext')}
                onChange={this.handleInputChange('number_of_samples')}
              />

              <Input
                id="igo_request_id"
                classes={classes.textField}
                // select

                onChange={this.handleInputChange('igo_request_id')}
                label={translate('header.igo_request_id_label')}
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
              form="my-form-id"
              className={classes.button}
              color="secondary"
            >
              {translate('header.generate_button')}
            </Button>
          </div>
        )}
      </Translate>
    )
  }
}

// classes,
//       form,
//       handleSubmit,
//       handleApplicationChange,
//       handleMaterialChange,

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

export default withStyles(styles)(UploadForm)
