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
  error,
}) => (
  <React.Fragment>
    <TextField
      error={error}
      InputProps={inputProps}
      id={id}
      className={classes}
      type={type}
      label={label}
      helperText={helperText}
      onChange={onChange}
    />
  </React.Fragment>
)

Input.propTypes = {
  InputProps: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
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

export default Input
