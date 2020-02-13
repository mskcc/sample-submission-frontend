import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import {
  GridButton,
  Button,
  Checkbox,
  Dropdown,
  Input,
} from '../../components/index.js'
import 'handsontable/dist/handsontable.full.css'
import { withLocalize } from 'react-localize-redux'
import {
  TextField,
  FormControl,
  InputAdornment,
  Paper,
} from '@material-ui/core'

import { connect } from 'react-redux'
import { promoteActions } from '../../actions'

class Promote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      service_id: '',
      // investigator: '',
    }
  }
  componentDidMount() {
    // todo wait for token refresh!
    console.log(this.props)
    if (!this.props.promote.initialFetched) {
      this.props.getInitialState()
    }
  }

  handleChange = () => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = () => {
    if (this.state.service_id) {
      this.props.loadBankedSamples(this.state.service_id)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        {this.props.promote.initialFetched && (
          <div className={classes.container}>
            <div className={classes.buttons}>
              <FormControl component="fieldset">
                <Input
                  id="service_id"
                  value={this.state.service_id}
                  // error={!formValid.service_id}
                  onChange={this.handleChange}
                  type="text"
                />{' '}
              </FormControl>
              <GridButton
                id="load_banked"
                onClick={this.handleSubmit}
                isLoading={false}
                nothingToSubmit={false}
                color="primary"
              />
            </div>
            <HotTable
              licenseKey="non-commercial-and-evaluation"
              id="hot"
              data={this.props.promote.rows}
              colHeaders={this.props.promote.columns}
              columns={this.props.promote.columnFeatures}
              rowHeaders={true}
              hiddenColumns={this.props.promote.hiddenColumns}
              headerTooltips={true}
              manualColumnResize={true}
              comments={true}
              ref={this.hotTableComponent}
              width="95%"
              stretchH="all"
              // height="10%"
              height="500"
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  promote: state.upload.promote,
})

const mapDispatchToProps = {
  ...promoteActions,
}

const styles = theme => ({
  container: {
    // borderRight: '1px solid gray',
    display: 'grid',
    justifyItems: 'center',
    marginLeft: theme.spacing(2),
    width: '95vw',
    // maxHeight: 600,
    overflow: 'hidden',
    marginBottom: '5em',
  },
  buttons: { width: '90vw' },
  tooltipCell: {
    fontSize: '.8em',
    color: 'black !important',
    backgroundColor: '#cfd8dc !important',
  },
  submit: {
    width: '30px',
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Promote))
