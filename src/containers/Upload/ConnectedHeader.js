import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Translate } from 'react-localize-redux'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from 'react-select'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import { fetchMaterialsAndApplications } from '../../actions/actions'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

class ConnectedHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchMaterialsAndApplications()
  }

  render() {
    const { classes, form } = this.props
    return (
      <header className={classes.header}>
        <Translate>
          {({ translate }) => (
            <React.Fragment>
              <form className={classes.container}>
                {form.materials && (
                  <TextField
                    className={classes.textField}
                    select
                    value={form.material}
                    required
                    label={translate('header.material_dropdown')}
                  >
                    {form.materials.map(material => (
                      <MenuItem key={material.id} value={material.id}>
                        {material.value}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <TextField
                  className={classes.textField}
                  select
                  required
                  value={form.application}
                  label={translate('header.application_dropdown')}
                >
                  {form.applications &&
                    form.applications.map(application => (
                      <MenuItem key={application.id} value={application.id}>
                        {application.value}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  className={classes.textField}
                  required
                  label={translate('header.species_dropdown')}
                />
                <TextField
                  className={classes.textField}
                  id="standard-number"
                  required
                  label={translate('header.sample_number_input')}
                  type="number"
                />

                <TextField
                  className={classes.textField}
                  id="standard-number"
                  required
                  label={translate('header.container_dropdown')}
                  type="number"
                />

                <TextField
                  className={classes.textField}
                  id="standard-number"
                  required
                  label={translate('header.patient_id_format_dropdown')}
                  type="number"
                />
                <TextField
                  className={classes.textField}
                  id="standard-number"
                  // select
                  required
                  label={translate('header.igo_request_id_input')}
                  type="number"
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
        )
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
    margin: theme.spacing.unit,

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
    fetchMaterialsAndApplications,
  }
)(StyledHeader)
