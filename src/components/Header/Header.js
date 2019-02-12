import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Translate } from 'react-localize-redux'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import './header.scss'

class Header extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes } = this.props
    return (
      <header className={classes.header}>
        <Translate>
          {({ translate }) => (
            <React.Fragment>
              <form className={classes.container}>
                <TextField
                  className={classes.textField}
                  select
                  required
                  label={translate('header.material_dropdown')}
                />
                <TextField
                  className={classes.textField}
                  select
                  required
                  label={translate('header.application_dropdown')}
                />
                <TextField
                  className={classes.textField}
                  select
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
                  select
                  required
                  label={translate('header.container_dropdown')}
                  type="number"
                />

                <TextField
                  className={classes.textField}
                  id="standard-number"
                  select
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
      </header>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

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

export default withStyles(styles)(Header)
