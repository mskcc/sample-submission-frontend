import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

const Header = props => (
  <div className="mskcc-header">
    <NavLink to="/upload" activeClassName="active">
      {' '}
      Upload
    </NavLink>
    {' | '}
    <NavLink to="/promote" activeClassName="active">
      {' '}
      Promote
    </NavLink>
  </div>
)

export default Header
