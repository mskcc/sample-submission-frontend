import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'

import classNames from 'classnames'
import image from './msk.png'

const Header = ({ classes }) => (
  <div className={classes.mskccHeader}>
    <CardMedia
      component="img"
      alt="MSKCC Logo"
      className={classes.mskccLogo}
      image={image}
      title="MSKCC Logo"
    />

    <div className={classes.nav}>
      <div>Sample Intake V2</div>

      <NavLink
        to="/upload"
        activeClassName="active"
        className={classes.navlink}
      >
        {' '}
        Upload
      </NavLink>
      {' | '}
      <NavLink
        to="/promote"
        activeClassName="active"
        className={classes.navlink}
      >
        {' '}
        Promote
      </NavLink>
    </div>
  </div>
)

const styles = theme => ({
  mskccHeader: {
    gridArea: 'mskcc-header',
    fontSize: '2em',
    paddingTop: '2em',
    paddingBottom: '2em',
    backgroundColor: theme.palette.primary.logo,
    color: 'white',
    width: '100vw',
    textAlign: 'center',
  },
  nav: { marginTop: '2em' },
  mskccLogo: {
    position: 'absolute',
    float: 'left',
    height: 'auto',
    width: '10%',
  },
  navlink: {
    fontSize: '.5em',
  },
})

export default withStyles(styles)(Header)
