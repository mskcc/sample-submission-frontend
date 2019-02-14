import React, { Component } from 'react'

import PropTypes from 'prop-types'
import MuiDownshift from 'mui-downshift'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

class DropdownField extends Component {
  render() {
    const { label, helptext, value, onChange, items, classes } = this.props
    return (
      <div className={classes.textField}>
        <MuiDownshift
          menuItemCount={10}
          getInputProps={({}) => ({
            label: label,
            helperText: helptext + ' (' + items.length + ' choices)',
            required: true,
          })}
          items={items}
          focusOnClear
          onChange={e => onChange(this.input.value)}
          inputRef={node => {
            this.input = node
          }}
        />
      </div>
    )
  }
}

DropdownField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  label: PropTypes.string.isRequired,
  helptext: PropTypes.string.isRequired,

  // value: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
}

const styles = theme => ({
  textField: {
    margin: 2 * theme.spacing.unit,
    minWidth: 350,
  },
})

export default withStyles(styles)(DropdownField)
