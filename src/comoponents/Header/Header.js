import React, { Component } from 'react'
import './header.scss'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import Button from '@material-ui/core/Button'

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
        <div className="table-form">
          <form>
            <TextField
              className={classes.textField}
              margin="normal"
              label=" Select Material for Submission:"
            />
            <TextField
              className={classes.textField}
              margin="normal"
              label=" Application:"
            />
            <TextField
              className={classes.textField}
              margin="normal"
              label=" Species:"
            />
            <TextField
              className={classes.textField}
              id="standard-number"
              label="Number of Samples"
              type="number"
              margin="normal"
            />
            <TextField
              className={classes.textField}
              label=" Request ID:"
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
            label="Submit"
            className={classes.button}
          >
            Generate Table
          </Button>
        </div>
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
