import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 500,
    margin: '0 auto',
  },
})

const Message = ({ type, msg, classes }) => (
  <div>
    <Paper className={classes.container} elevation={1}>
      <Typography variant="h5" component="h3">
        {type || 'Sorry.'}
      </Typography>
      <Typography component="p">{msg}</Typography>
    </Paper>
  </div>
)

Message.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Message)
