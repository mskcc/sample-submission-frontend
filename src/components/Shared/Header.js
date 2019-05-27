import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Avatar,
  AppBar,
  Toolbar,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core'

import classNames from 'classnames'
import image from './msk.png'

const Header = ({ classes, loggedIn }) => (
  // <div className={classes.mskccHeader}>
  <AppBar position="static" title={image} className={classes.header}>
    <Toolbar>
      <Avatar alt="mskcc logo" src={image} className={classes.avatar} />

      <Typography color="inherit" variant="h6" className={classes.title}>
        SampleReceiving V2
      </Typography>
      {loggedIn ? (
        <React.Fragment>
          <Button>
            <NavLink
              to="/upload"
              activeClassName={classes.active}
              className={classes.navlink}
            >
              <Typography color="inherit" variant="h6">
                Upload
              </Typography>
            </NavLink>
          </Button>
          <Button>
            <NavLink
              to="/promote"
              activeClassName={classes.active}
              className={classes.navlink}
            >
              <Typography color="inherit" variant="h6">
                Promote
              </Typography>
            </NavLink>
          </Button>

          <Button>
            <NavLink
              to="/logout"
              activeClassName={classes.active}
              className={classes.navlink}
            >
              <Typography color="inherit" variant="h6">
                Logout
              </Typography>
            </NavLink>
          </Button>
        </React.Fragment>
      ) : (
        <Button>
          <NavLink
            to="/login"
            activeClassName={classes.active}
            className={classes.navlink}
          >
            <Typography color="inherit" variant="h6">
              Login
            </Typography>
          </NavLink>
        </Button>
      )}
    </Toolbar>
  </AppBar>

  // </div>
)

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.logo,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    marginRight: theme.spacing.unit * 3,
  },

  navlink: {
    color: theme.palette.textSecondary,
    textDecoration: 'none',
    marginRight: theme.spacing.unit,
  },
  active: {
    color: 'white',
    fontSize: '1em',
  },
})

export default withStyles(styles)(Header)
