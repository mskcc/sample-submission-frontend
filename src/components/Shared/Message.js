import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxWidth: 500,
    margin: '0 auto',
  },
})
const htmlDecode = content => {
  let e = document.createElement('div')
  e.innerHTML = content
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
}

const Message = ({ type, msg, classes }) => (
  <div>
    <Paper className={classes.container} elevation={1}>
      <Typography component="p">
        {msg ? (
          msg
        ) : (
          <React.Fragment>
            <span>
              Due to the evolving situation, IGO is not accepting or processing
              new samples at this time. If you would like to save submission
              data for a future project, you are welcome to do so. We hope to be
              back up and running your experiments as soon as possible.
            </span>
          </React.Fragment>
        )}
      </Typography>
    </Paper>
  </div>
)

Message.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Message)
