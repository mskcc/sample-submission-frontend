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
    maxWidth: "70vw",
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
                IGO plans to resume “new-normal” activities the week of May 18th.
                Please refer to  <a href="http://genomics.mskcc.org/"> genomics.mskcc.org</a> for the most up-to-date information,
                including current sample submission guidelines and which platforms IGO is offering.
                <br />
                Saved submissions can now be submitted.
                When you’ve completed your iLabs request and submitted your
                Sample Submission, please email zzPDL_SKI_IGO_Sample_and_Project_Management@mskcc.org to schedule a sample drop off time.

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
