import React, { Component } from 'react'

import PropTypes from 'prop-types'
import MuiDownshift from 'mui-downshift'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

class Dropdown extends Component {
  state = {
    filteredItems: this.props.items,
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ filteredItems: this.props.items })
    }
  }

  handleStateChange = changes => {
    if (typeof changes.inputValue === 'string') {
      const filteredItems = this.props.items.filter(item =>
        item.label.toLowerCase().includes(changes.inputValue.toLowerCase())
      )
      this.setState({ filteredItems })
    }
    if (this.input && this.props.blurOnSelect) {
      this.input.blur()
    }
  }
  render() {
    const { dynamic, onChange, onSelect, input, loading, classes } = this.props
    const { filteredItems } = this.state
    return (
      <div className={classes.textField}>
        {dynamic ? (
          <MuiDownshift
            onStateChange={this.handleStateChange}
            includeFooter={loading}
            {...input}
            {...this.props}
            loading={loading}
            menuItemCount={10}
            items={filteredItems}
            focusOnClear
            onSelect={e => this.props.onSelect(this.input.value)}
            inputRef={node => {
              this.input = node
            }}
          />
        ) : (
          <MuiDownshift
            onStateChange={this.handleStateChange}
            includeFooter={loading}
            {...input}
            {...this.props}
            loading={loading}
            menuItemCount={10}
            items={filteredItems}
            focusOnClear
            onChange={e => onChange(this.input)}
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
