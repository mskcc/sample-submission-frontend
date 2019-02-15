import React from 'react'
import { Field } from 'redux-form'

import { Translate } from 'react-localize-redux'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from 'react-select'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import DropdownField from './DropdownField'

export const FormComponent = (
  {
    handleSubmit,
    handleChange,
    handleApplicationChange,
    handleMaterialChange,
    onSubmit,
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
            <DropdownField
              dynamic
              onSelect={handleMaterialChange}
              name="material"
              items={form.materials.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              label={translate('header.material_label')}
              helptext={translate('header.material_helptext')}
              loading={form.isLoading}
            />
            <DropdownField
              name="application"
              dynamic
              onSelect={handleApplicationChange}
              items={form.applications.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              label={translate('header.application_label')}
              helptext={translate('header.application_helptext')}
              loading={form.isLoading}
            />

            <DropdownField
              name="species"
              items={form.picklists.Species.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              label={translate('header.species_label')}
              helptext={translate('header.species_helptext')}
            />

            <DropdownField
              name="patient_id_format"
              onChange={handleChange}
              required
              items={form.materials.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              label={translate('header.patient_id_format_label')}
              helptext={translate('header.patient_id_format_helptext')}
            />

            <DropdownField
              name="container"
              onChange={handleChange}
              items={form.materials.map(option => ({
                value: option.id,
                label: option.value,
              }))}
              required
              label={translate('header.container_label')}
              helptext={translate('header.container_helptext')}
            />
            <TextField
              className={classes.textField}
              required
              label={translate('header.sample_number_label')}
              helperText={translate('header.sample_number_helptext')}
              type="number"
            />

            <TextField
              className={classes.textField}
              // select
              required
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
