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
              IGO is accepting new samples until Thursday, 03/17, at 5pm.
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
