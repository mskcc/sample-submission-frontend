import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const Input = ({
  id,
  classes,
  type,
  label,
  helperText,
  onChange,
  inputProps,
}) => (
  <TextField
    InputProps={inputProps}
    id={id}
    className={classes}
    required
    type={type}
    label={label}
    helperText={helperText}
    onChange={onChange}
  />
)

Input.propTypes = {
  InputProps: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  label: 'label',
  helperText: 'helptext',
}

export default Input
