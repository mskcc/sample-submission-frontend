import { Field } from 'redux-form'
import React, { Component } from 'react'
import Dropdown from './Dropdown'

const DropdownField = props => (
  <Field component={Dropdown} {...props} />
)


export default DropdownField
