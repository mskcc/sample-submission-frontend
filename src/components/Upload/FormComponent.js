import React from 'react'
import { Translate } from 'react-localize-redux'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'

import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Dropdown from './Dropdown'

export const FormComponent = (
  {
    handleSubmit,
    handleInputChange,
    handleDropdownChange,
    handleApplicationChange,
    handleMaterialChange,
    onSubmit,
    onSelect,
    classes,
    form,
  },
  ...props
) => {
  return (
    <Translate>
      {({ translate }) => (
        <div className={classes.form}>
          <form className={classes.container} onSubmit={handleSubmit}>
            <Dropdown
              onSelect={handleMaterialChange}
              items={form.materials.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              loading={form.isLoading}
              dynamic
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
              onSelect={handleApplicationChange}
              items={form.applications.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              loading={form.isLoading}
              dynamic
              getInputProps={() => ({
                id: 'application',

                label: translate('header.application_label'),
                helperText:
                  translate('header.application_helptext') +
                  ' (' +
                  form.materials.length +
                  ' choices)',
                required: true,
              })}
            />

            <Dropdown
              loading={form.isLoading}
              onChange={handleDropdownChange}
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
              onChange={handleDropdownChange}
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
              onChange={handleDropdownChange}
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
              onChange={handleInputChange('number_of_samples')}
            />

            <TextField
              id="igo_request_id"
              className={classes.textField}
              // select
              required
              onChange={handleInputChange('igo_request_id')}
              label={translate('header.igo_request_id_label')}
              InputProps={{
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
            onClick={handleSubmit}
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
