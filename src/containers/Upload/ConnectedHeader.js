import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Translate } from 'react-localize-redux'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from 'react-select'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import {
  getMaterialsAndApplications,
  getApplicationsForMaterial,
  getMaterialsForApplication,
  resetMaterialsAndApplications
} from '../../actions/actions'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { DropdownField } from '../../components'

class ConnectedHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
    }
    this.handleMaterialChange = this.handleMaterialChange.bind(this)
    this.handleApplicationChange = this.handleApplicationChange.bind(this)
  }

  componentDidMount() {
    this.props.getMaterialsAndApplications()
  }

  handleMaterialChange = selectedMaterial => {
    if (selectedMaterial === '') {
      this.props.resetMaterialsAndApplications()
    } else {
      this.props.getApplicationsForMaterial(selectedMaterial)
    }
  }
  handleApplicationChange = selectedApplication => {
    if (selectedApplication === '') {
      this.props.resetMaterialsAndApplications()
    } else {
      this.props.getMaterialsForApplication(selectedApplication)
    }
  }

  render() {
    const { classes, form } = this.props
    return (
      <header className={classes.header}>
        <Translate>
          {({ translate }) => (
            <React.Fragment>
              <form className={classes.container}>
                <DropdownField
                  onChange={this.handleMaterialChange}
                  items={form.materials.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                  label={translate('header.material_label')}
                  helptext={translate('header.material_helptext')}
                />
                <DropdownField
                  onChange={this.handleApplicationChange}
                  items={form.applications.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                  label={translate('header.application_label')}
                  helptext={translate('header.application_helptext')}
                />

                <DropdownField
                  onChange={this.handleChange}
                  items={form.materials.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                  label={translate('header.species_label')}
                  helptext={translate('header.species_helptext')}
                />

                <DropdownField
                  onChange={this.handleChange}
                  required
                  items={form.materials.map(option => ({
                    value: option.id,
                    label: option.value,
                  }))}
                  label={translate('header.patient_id_format_label')}
                  helptext={translate('header.patient_id_format_helptext')}
                />

                <DropdownField
                  onChange={this.handleChange}
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
            </React.Fragment>
          )}
        </Translate>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
})

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '70%',
  },
  header: {
    // backgroundColor: theme.palette.primary.light,
    gridArea: 'header',
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

const StyledHeader = withStyles(styles)(ConnectedHeader)
export default connect(
  mapStateToProps,
  {
    getMaterialsAndApplications,
    getMaterialsForApplication,
    getApplicationsForMaterial,
    resetMaterialsAndApplications,
  }
)(StyledHeader)
