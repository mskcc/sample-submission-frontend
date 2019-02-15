import { Field } from 'redux-form'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import MuiDownshift from 'mui-downshift'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

class Dropdown extends Component {
  render() {
    const {
      label,
      dynamic,
      helptext,
      onChange,
      input,
      items,
      loading,
      classes,
    } = this.props

    return (
      <div className={classes.textField}>
        {dynamic ? (
          <MuiDownshift
            includeFooter={loading}
            {...input}
            onStateChange={({ inputValue }) => {
              return input.onChange(inputValue)
            }}
            loading={loading}
            menuItemCount={10}
            getInputProps={({}) => ({
              label: label,
              helperText: helptext + ' (' + items.length + ' choices)',
              required: true,
            })}
            items={items}
            focusOnClear
            onSelect={
              dynamic ? e => this.props.onSelect(this.input.value) : undefined
            }
            onChange={e => onChange(this.input.value)}
            inputRef={node => {
              this.input = node
            }}
          />
        ) : (
          <MuiDownshift
            {...input}
            onStateChange={({ inputValue }) => {
              return input.onChange(inputValue)
            }}
            menuItemCount={10}
            getInputProps={({}) => ({
              label: label,
              helperText: helptext,
              required: true,
            })}
            items={items}
            focusOnClear
            onChange={e => onChange(this.input.value)}
            inputRef={node => {
              this.input = node
            }}
          />
        )}
      </div>
    )
  }
}
Dropdown.defaultProps = {
  label: 'label',
  helptext: 'helptext',
  items: [
    { label: 'itemId', value: 'itemValue' },
    { label: 'itemId1', value: 'itemValue1' },
  ],
  loading: false,
  onChange: function() {
    e => onChange(this.input.value)
  },
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  label: PropTypes.string.isRequired,
  helptext: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
}

const styles = theme => ({
  textField: {
    margin: 2 * theme.spacing.unit,
    minWidth: 350,
  },
})

export default withStyles(styles)(Dropdown)
