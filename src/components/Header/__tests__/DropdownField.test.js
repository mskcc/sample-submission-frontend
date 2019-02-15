import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import TestDropdownField from '../DropdownField'

const DropdownField = props => <TestDropdownField {...props} />

describe('Render DropdownField', () => {
  it('render DropdownField correctly', () => {
    const DropdownFieldComponent = renderer.create(<DropdownField />).toJSON()
    expect(DropdownFieldComponent).toMatchSnapshot()
  })

  it('render DropdownField correctly with loading animation', () => {
    const wrapper = mount(<DropdownField loading={true} />)
    const progress = wrapper.find('LinearProgress').first()
    expect(progress.exists()).toBe(true)
  })
})
