import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Translate } from "react-localize-redux";

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
      <header>
        <Translate>
          {({ translate }) => (
            <div className="table-form">
              <form>
                <TextField
                  className={classes.textField}
                  margin="normal"
                  label={translate('header.material_dropdown')}
                />
                <TextField
                  className={classes.textField}
                  margin="normal"
                  label={translate('header.application_dropdown')}
                />
                <TextField
                  className={classes.textField}
                  margin="normal"
                  label={translate('header.species_dropdown')}
                />
                <TextField
                  className={classes.textField}
                  id="standard-number"
                  label={translate('header.sample_number_input')}
                  type="number"
                  margin="normal"
                />
                <TextField
                  className={classes.textField}
                  label={translate('header.request_id_input')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">IGO-</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textField}
                  id="standard-number"
                  label={translate('header.container_dropdown')}
                  type="number"
                  margin="normal"
                />
                  <TextField
                  className={classes.textField}
                  id="standard-number"
                  label={translate('header.patient_id_format_dropdown')}
                  type="number"
                  margin="normal"
                />
              </form>
              <Button
                variant="contained"
                type="submit"
                form="my-form-id"
                label={translate('header.')}
                className={classes.button}
              >
                Generate Table
              </Button>
            </div>
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 350,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    color: 'white',
    margin: theme.spacing.unit,
    backgroundColor: '#f26428',
    display: 'inline-block',
    width: 200,
  },
})

export default withStyles(styles)(Header)
