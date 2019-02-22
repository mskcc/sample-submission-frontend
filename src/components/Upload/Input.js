import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const Input = ({
  id,
  classes,
  type,
  label,
  helperText,
  onChange,
  inputProps,
  error,
}) => (
  <Translate>
    {({ translate }) => (
      <TextField
        error={error}
        className={classes.textField}
        InputProps={inputProps}
        id={id}
        type="number"
        label={
          error
            ? translate('upload.form.fill_me')
            : translate('upload.form.' + id + '_label')
        }
        helperText={translate('upload.form.' + id + '_helptext')}
      />
    )}
  </Translate>
)

Input.propTypes = {
  InputProps: PropTypes.object,
  id: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  label: 'label',
  helperText: '',
}

const styles = theme => ({
  textField: {
    margin: 2 * theme.spacing.unit,
    minWidth: 350,
  },
})

export default withStyles(styles)(Input)
